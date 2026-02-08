import util from 'node:util';

const float = (n) => `${n}F`;
const literal = (x) => `"${x}"`;
const list = (n) => (arr) => {
  if (arr.length > n) return `
	${arr.join(",\n	")}
`;
  return arr.join(", ");
};
const array = (n) => (arr) => `[${list(n)(arr)}]`;
const id = (id2) => typeof id2 === "string" ? id2 : "null";
const weight = (weight2) => (id2) => `${id2}.weight(${weight2})`;
const stack = (stack2) => `${stack2.id} * ${stack2.n}`;
const bonus$1 = (bonus2) => `${bonus2.id} % ${Math.round(bonus2.p * 100)}`;
const liquid = (liquid2) => {
  if (!liquid2.id.startsWith("<liquid:")) throw new Error("ID is not a liquid");
  return `${liquid2.id} * ${liquid2.mb}`;
};
const ingredient = (ingredient2) => typeof ingredient2 === "string" ? ingredient2 : stack(ingredient2);
const cast = (cast2) => {
  if (typeof cast2 === "string") return [cast2, false];
  if (!cast2) return [null, false];
  return [cast2.id, cast2.consume];
};
const shaped = (recipe2) => {
  const f = (...arr) => {
    for (const x of arr) {
      if (typeof x === "string") return x;
    }
    return null;
  };
  const matrix = [[
    f(recipe2.fill, recipe2.square, recipe2.ring, recipe2.corner, recipe2[1]),
    f(recipe2.fill, recipe2.square, recipe2.ring, recipe2.edge, recipe2[2]),
    f(recipe2.fill, recipe2.ring, recipe2.corner, recipe2[3])
  ], [
    f(recipe2.fill, recipe2.square, recipe2.ring, recipe2.edge, recipe2[4]),
    f(recipe2.fill, recipe2.square, recipe2.center, recipe2[5]),
    f(recipe2.fill, recipe2.ring, recipe2.edge, recipe2[6])
  ], [
    f(recipe2.fill, recipe2.ring, recipe2.corner, recipe2[7]),
    f(recipe2.fill, recipe2.ring, recipe2.edge, recipe2[8]),
    f(recipe2.fill, recipe2.ring, recipe2.corner, recipe2[9])
  ]];
  if (matrix[0][2] === null && matrix[1][2] === null && matrix[2].every((x) => x === null)) {
    matrix[0].splice(-1);
    matrix[1].splice(-1);
    matrix.splice(-1);
  }
  return array(2)(matrix.map((row) => array(3)(row.map(id))));
};
const COLOR = {
  black: "\\u00A70",
  darkBlue: "\\u00A71",
  darkGreen: "\\u00A72",
  darkAqua: "\\u00A73",
  darkRed: "\\u00A74",
  darkPurple: "\\u00A75",
  gold: "\\u00A76",
  gray: "\\u00A77",
  darkGray: "\\u00A78",
  blue: "\\u00A79",
  green: "\\u00A7a",
  aqua: "\\u00A7b",
  red: "\\u00A7c",
  lightPurple: "\\u00A7d",
  yellow: "\\u00A7e",
  white: "\\u00A7f"
};
const STYLE = {
  obfuscated: "\\u00A7k",
  bold: "\\u00A7l",
  strikethrough: "\\u00A7m",
  underline: "\\u00A7n",
  italic: "\\u00A7o"
};
const name = (...texts) => literal(texts.map((text) => {
  if (typeof text === "string") return text;
  return [
    text.color && COLOR[text.color],
    text.style && STYLE[text.style],
    text.text,
    (text.color ?? text.style) && "\\u00A7r"
  ].filter((x) => x !== void 0).join("");
}).join(""));
const tooltip = (...tooltips) => tooltips.map((tooltip2) => {
  if (typeof tooltip2 === "string") return literal(tooltip2);
  let out = literal(tooltip2.text);
  if (tooltip2.style) out = `format.${tooltip2.style}(${out})`;
  if (tooltip2.color) out = `format.${tooltip2.color}(${out})`;
  return out;
}).join(" + ");
const recipe = (...args) => list(3)(args.filter((x) => x !== void 0).map((x) => {
  if (Array.isArray(x)) return array(3)(x);
  if (x === null) return "null";
  return x;
}));

const clamp = (min, max, n) => Math.max(min, Math.min(max, n));

const addGrinder = (recipe$1) => {
  const out = recipe(
    ingredient(recipe$1.input),
    ingredient(recipe$1.output),
    Math.max(1, Math.round(recipe$1.turns)),
    ...(recipe$1.bonus ?? []).map((bonus) => `${bonus.id}, ${clamp(0, 1, bonus.p)}`)
  );
  return `mods.appeng.Grinder.addRecipe(${out});`;
};
const removeGrinder = (input) => `mods.appeng.Grinder.removeRecipe(${input});`;
const addPressInscriber = (type) => (recipe$1) => {
  const out = recipe(
    [recipe$1.input.center],
    recipe$1.input.top,
    recipe$1.input.bottom ?? null,
    ingredient(recipe$1.output),
    literal(type)
  );
  return `mods.appeng.Inscriber.addRecipe(${out});`;
};
const addInscriber = addPressInscriber("Inscribe");
const addPress = addPressInscriber("Press");
const removePressInscriber = (output) => `mods.appeng.Inscriber.removeRecipe(${output});`;

const addCompressor = (recipe$1) => {
  const out = recipe(
    recipe$1.output,
    Math.max(1, recipe$1.input.n),
    recipe$1.input.id,
    recipe$1.exact
  );
  return `mods.avaritia.Compressor.add(${out});`;
};
const removeCompressor = (id) => `mods.avaritia.Compressor.remove(${id});`;
const addExtreme = (output) => (input) => {
  const out = recipe(
    ingredient(output),
    input.map((row) => array(9)(row.map(id)))
  );
  return `mods.avaritia.ExtremeCrafting.addShaped(${out});`;
};
const removeExtreme = (id) => `mods.avaritia.ExtremeCrafting.remove(${id});`;

const createBlock = (id) => (recipe$1) => {
  const out = recipe(
    literal(recipe$1.name),
    literal(id),
    literal(recipe$1.material),
    typeof recipe$1.texture === "string" ? literal(recipe$1.texture) : literal(id),
    typeof recipe$1.creativeTab === "string" && literal(recipe$1.creativeTab),
    typeof recipe$1.renderType === "number" ? recipe$1.renderType : 1,
    recipe$1.drops,
    recipe$1.unbreakable,
    typeof recipe$1.hardness === "number" && float(recipe$1.hardness),
    typeof recipe$1.lightLevel === "number" && float(recipe$1.lightLevel),
    recipe$1.opacity
  );
  return `mods.content.Block.registerBlock(${out});`;
};
const createItem = (id) => (recipe$1) => {
  const out = recipe(
    literal(recipe$1.name),
    literal(id),
    typeof recipe$1.texture === "string" ? literal(recipe$1.texture) : literal(id),
    typeof recipe$1.creativeTab === "string" ? literal(recipe$1.creativeTab) : literal("misc"),
    typeof recipe$1.damage === "number" ? recipe$1.damage : 0,
    typeof recipe$1.stackSize === "number" ? recipe$1.stackSize : 64,
    typeof recipe$1.toolType === "string" ? literal(recipe$1.toolType) : literal("pickaxe"),
    typeof recipe$1.level === "number" ? recipe$1.level : 0,
    !!recipe$1.is3d,
    (recipe$1.tooltip ?? []).map(literal)
  );
  return `mods.content.Item.registerItem(${out});`;
};
const createLiquid = (id) => (recipe$1) => {
  const out = recipe(
    literal(id),
    recipe$1.density,
    !!recipe$1.gaseous,
    recipe$1.luminosity,
    recipe$1.temperature,
    recipe$1.viscosity,
    recipe$1.color,
    !!recipe$1.setFire,
    typeof recipe$1.castingMaterial === "number" ? recipe$1.castingMaterial : 0,
    typeof recipe$1.texture?.still === "string" ? literal(recipe$1.texture.still) : null,
    typeof recipe$1.texture?.flowing === "string" ? literal(recipe$1.texture.flowing) : null
  );
  return `mods.content.Fluid.registerFluid(${out});`;
};
const createMaterial = (id) => (recipe$1) => {
  const out = recipe(
    literal(id),
    literal(recipe$1.name),
    literal(recipe$1.color.name),
    recipe$1.resource,
    recipe$1.id,
    recipe$1.level,
    recipe$1.durability,
    recipe$1.speed,
    recipe$1.damage,
    recipe$1.reinforced,
    recipe$1.color.tool,
    recipe$1.value,
    recipe$1.modifier,
    recipe$1.stonebound,
    !!recipe$1.buildParts,
    recipe$1.modifiers,
    literal(recipe$1.tooltip),
    recipe$1.arrow.mass,
    recipe$1.arrow.breakChance,
    recipe$1.bow.drawSpeed,
    recipe$1.bow.speed,
    Array.isArray(recipe$1.nativeModifiers) && array(1)([array(2)(recipe$1.nativeModifiers.map(ingredient))]),
    Array.isArray(recipe$1.nativeEnchantments) && literal(recipe$1.nativeEnchantments.join(" "))
  );
  return `mods.content.Material.registerMaterial(${out});`;
};

const addComposter = (recipe$1) => {
  const out = recipe(
    recipe$1.id,
    recipe$1.fill,
    typeof recipe$1.color === "string" && literal(recipe$1.color)
  );
  return `mods.exnihilo.Composting.addRecipe(${out});`;
};
const removeComposter = (id) => `mods.exnihilo.Composting.removeRecipe(${id});`;
const addCrucible = (output) => (input) => {
  const out = recipe(input, liquid(output));
  return `mods.exnihilo.Crucible.addRecipe(${out});`;
};
const removeCrucible = (output) => `mods.exnihilo.Crucible.removeRecipe(${output});`;
const addCrucibleFuel = (input) => {
  const out = recipe(input.id, input.n);
  return `mods.exnihilo.Crucible.addHeatSource(${out});`;
};
const removeCrucibleFuel = (input) => `mods.exnihilo.Crucible.removeHeatSource(${input});`;
const addHammer = (input) => (...output) => {
  const out = recipe(
    input,
    output.map((bonus) => bonus.id),
    output.map((bonus) => bonus.p),
    output.map((bonus) => bonus.luck ?? 0)
  );
  return `mods.exnihilo.Hammer.addRecipe(${out});`;
};
const removeHammer = (input) => `mods.exnihilo.Hammer.removeRecipe(${input});`;
const addSieve = (input) => (...output) => {
  const out = recipe(
    input,
    output.map((bonus) => bonus.id),
    output.map((bonus) => Math.round(1 / bonus.p))
  );
  return `mods.exnihilo.Sieve.addRecipe(${out});`;
};
const removeSieve = (input) => `mods.exnihilo.Sieve.removeRecipe(${input});`;

const addQED = (output) => (input) => {
  const out = recipe(
    ingredient(output),
    shaped(input)
  );
  return `mods.extraUtils.QED.addShapedRecipe(${out});`;
};
const removeQED = (output) => `mods.extraUtils.QED.removeRecipe(${output});`;

const addCarpenter = (recipe$1) => {
  const out = recipe(
    ingredient(recipe$1.output),
    shaped(recipe$1.input),
    recipe$1.liquid && liquid(recipe$1.liquid),
    Math.max(1, Math.round(recipe$1.ticks)),
    recipe$1.top
  );
  return `mods.forestry.Carpenter.addRecipe(${out});`;
};
const removeCarpenter = (output, liquid) => `mods.forestry.Carpenter.removeRecipe(${recipe(output, liquid)});`;
const addCentrifuge = (recipe$1) => {
  const out = recipe(
    recipe$1.output.map(bonus$1),
    recipe$1.input,
    recipe$1.ticks
  );
  return `mods.forestry.Centrifuge.addRecipe(${out});`;
};
const removeCentrifuge = (input) => `mods.forestry.Centrifuge.removeRecipe(${input});`;
const addFermenter = (recipe$1) => {
  const out = recipe(
    recipe$1.output.id,
    recipe$1.catalyst,
    recipe$1.input.id,
    recipe$1.input.mb,
    recipe$1.output.mb / recipe$1.input.mb
  );
  return `mods.forestry.Fermenter.addRecipe(${out});`;
};
const removeFermenter = (input) => `mods.forestry.Fermenter.removeRecipe(${input});`;
const addFermenterFuel = (recipe$1) => {
  const out = recipe(
    recipe$1.id,
    recipe$1.cycles,
    recipe$1.burn
  );
  return `mods.forestry.Fermenter.addFuel(${out});`;
};
const removeFermenterFuel = (input) => `mods.forestry.Fermenter.removeFuel(${input});`;
const addMoistener = (recipe$1) => {
  const out = recipe(
    recipe$1.output,
    recipe$1.input,
    recipe$1.ticks
  );
  return `mods.forestry.Moistener.addRecipe(${out});`;
};
const removeMoistener = (output) => `mods.forestry.Moistener.removeRecipe(${output});`;
const addSqueezer = (recipe$1) => {
  const out = recipe(
    liquid(recipe$1.output),
    bonus$1(recipe$1.bonus),
    recipe$1.input.map(ingredient),
    recipe$1.ticks
  );
  return `mods.forestry.Squeezer.addRecipe(${out});`;
};
const removeSqueezer = (output, input) => `mods.forestry.Squeezer.removeRecipe(${recipe(output, input)});`;
const addStill = (recipe$1) => {
  const out = recipe(
    liquid(recipe$1.output),
    liquid(recipe$1.input),
    recipe$1.ticks
  );
  return `mods.forestry.Still.addRecipe(${out});`;
};
const removeStill = (output, input) => `mods.forestry.Still.removeRecipe(${recipe(output, input)});`;
const addFabricator = (recipe$1) => {
  const out = recipe(
    ingredient(recipe$1.output),
    shaped(recipe$1.input),
    recipe$1.glass,
    recipe$1.cast
  );
  return `mods.forestry.ThermionicFabricator.addCast(${out});`;
};
const removeFabricator = (output) => `mods.forestry.ThermionicFabricator.removeCast(${output});`;
const addFabricatorGlass = (recipe$1) => {
  const out = recipe(
    recipe$1.mb,
    recipe$1.id,
    recipe$1.temperature
  );
  return `mods.forestry.ThermionicFabricator.addSmelting(${out});`;
};
const removeFabricatorGlass = (input) => `mods.forestry.ThermionicFabricator.removeSmelting(${input});`;

const withName = (name$1) => (id) => `${id}.displayName = ${name(name$1)};`;
const withTag = (tag) => (id) => `${id}.withTag(${util.inspect(tag).replace(/(:\s?)'([^']+)'/gm, '$1"$2"')})`;
const withWeight = (weight) => (id) => `${id}.weight(${weight})`;
const ENCHANTMENT = {
  protection: 0,
  fireProtection: 1,
  featherFalling: 2,
  blastProtection: 3,
  projectileProtection: 4,
  respiration: 5,
  aquaAffinity: 6,
  thorns: 7,
  sharpness: 16,
  smite: 17,
  baneOfAntrophods: 18,
  knockback: 19,
  fireAspect: 20,
  looting: 21,
  efficiency: 32,
  silkTouch: 33,
  unbreaking: 34,
  fortune: 35,
  power: 48,
  punch: 49,
  flame: 50,
  infinity: 51
};
const withEnchantment = (...enchantments) => withTag({
  ench: enchantments.map((enchantment) => ({
    id: typeof enchantment.id === "number" ? enchantment.id : ENCHANTMENT[enchantment.id],
    lvl: enchantment.lvl
  }))
});
const withTooltip = (...tooltip$1) => (id) => `${id}.addTooltip(${tooltip(...tooltip$1)});`;
const withTooltipShift = (...tooltip$1) => (id) => `${id}.addShiftTooltip(${tooltip(...tooltip$1)});`;

const addChestLoot = (id) => (...loots) => loots.map((loot) => {
  const out = recipe(
    literal(id),
    withWeight(typeof loot.p === "number" ? loot.p * 100 : 100)(loot.id),
    loot.min,
    loot.max
  );
  return `vanilla.loot.addChestLoot(${out});`;
}).join("\n");
const removeChestLoot = (chest) => (...ids) => ids.map((id) => `vanilla.loot.removeChestLoot(${recipe(literal(chest), id)});`).join("\n");
const addSeed = (seed) => `vanilla.seeds.addSeed(${withWeight(typeof seed.p === "number" ? seed.p * 100 : 100)(seed.id)});`;
const removeSeed = (id) => `vanilla.seeds.removeSeed(${id});`;

const maybe = (fn) => (x) => {
  if (x === null || x === void 0) return void 0;
  return fn(x);
};

const addShaped = (output) => (input) => {
  const out = recipe(
    ingredient(output),
    shaped(input)
  );
  return `recipes.addShaped(${out});`;
};
const removeShaped = (output, input) => {
  const out = recipe(
    output,
    maybe(shaped)(input)
  );
  return `recipes.removeShaped(${out});`;
};
const addShapeless = (output) => (input) => {
  const out = recipe(
    ingredient(output),
    array(3)(input)
  );
  return `recipes.addShapeless(${out});`;
};
const removeShapeless = (output, input) => {
  const out = recipe(
    output,
    maybe(array(3))(input)
  );
  return `recipes.removeShapeless(${out});`;
};
const add = (output) => (input) => {
  if (Array.isArray(input)) return addShapeless(output)(input);
  return addShaped(output)(input);
};
const remove = (output) => `recipes.remove(${output});`;
const addMirror = (output) => (input) => {
  const out = recipe(
    ingredient(output),
    shaped(input)
  );
  return `recipes.addShapedMirrored(${out});`;
};
const addFurnace = (recipe$1) => `furnace.addRecipe(${recipe(recipe$1.output, recipe$1.input, recipe$1.xp)});`;
const removeFurnace = (output, input) => {
  if (typeof input === "string") return `furnace.remove(${recipe(output, input)});`;
  return `furnace.remove(${recipe(output)});`;
};
const addFurnaceFuel = (fuel) => (n) => `furnace.setFuel(${recipe(fuel, n)});`;
const removeFurnaceFuel = (fuel) => addFurnaceFuel(fuel)(0);
const setLocalisation = (locale) => (recipe$1) => {
  const out = recipe(
    literal(locale),
    literal(recipe$1.id),
    literal(recipe$1.value)
  );
  return `game.setLocalization(${out});`;
};

const addBlacklistAutospawner = (id) => `mods.mfr.AutoSpawner.addBlacklist(${literal(id)});`;
const removeBlacklistAutospawner = (id) => `mods.mfr.AutoSpawner.removeBlacklist(${literal(id)});`;
const HARVESTER_TYPE = {
  tree: "tree",
  leaf: "treeLeaf",
  block: "normal",
  column: "column",
  treeInverse: "treeFlipped"
};
const addHarvester = (recipe$1) => {
  const out = recipe(
    recipe$1.id,
    recipe$1.bonus && array(3)(recipe$1.bonus.map((x) => {
      if (typeof x === "string") return x;
      if ("n" in x) return stack(x);
      return bonus$1(x);
    })),
    literal(HARVESTER_TYPE[recipe$1.type])
  );
  return `mods.mfr.Harvester.addHarvestable(${out});`;
};
const addLaserOre = (id) => (n) => `mods.mfr.MiningLaser.addOre(${recipe(weight(n)(id))});`;
const removeLaserOre = (id) => `mods.mfr.MiningLaser.removeOre(${recipe(id)});`;
const FOCI = {
  white: 0,
  orange: 1,
  magenta: 2,
  lightBlue: 3,
  yellow: 4,
  lime: 5,
  pink: 6,
  gray: 7,
  lightGray: 8,
  cyan: 9,
  purple: 10,
  blue: 11,
  brown: 12,
  green: 13,
  red: 14,
  black: 15
};
const addLaserFoci = (id) => (foci) => `mods.mfr.MiningLaser.addPreferredOre(${recipe(FOCI[foci], id)});`;
const removeLaserFoci = (id) => (foci) => `mods.mfr.MiningLaser.removePreferredOre(${recipe(FOCI[foci], id)});`;
const addLaser = (recipe) => [
  addLaserOre(recipe.id)(recipe.weight),
  addLaserFoci(recipe.id)(recipe.foci)
].join("\n");
const addPlanter = (id) => `mods.mfr.Planter.addPlantable(${id});`;
const addBiomeRubberTree = (id) => `mods.mfr.RubberTree.addBiome(${recipe(literal(id))});`;
const removeBiomeRubberTree = (id) => `mods.mfr.RubberTree.removeBiome(${recipe(literal(id))});`;
const addSludgeBoiler = (id) => (weight$1) => `mods.mfr.SludgeBoiler.addDrop(${recipe(weight(weight$1)(id))});`;
const removeSludgeBoiler = (id) => `mods.mfr.SludgeBoiler.removeDrop(${recipe(id)});`;

const hide = (id) => `mods.nei.NEI.hide(${id});`;
const show = (id) => `mods.nei.NEI.addEntry(${id});`;
const rename = (id) => (name) => `mods.nei.NEI.overrideName(${recipe(id, literal(name))});`;

const addOreDict = (dict) => (id) => `${dict}.add(${id});`;
const removeOreDict = (dict) => (id) => `${dict}.remove(${id});`;
const joinOreDict = (a) => (b) => `${a}.addAll(${b});`;
const mirrorOreDict = (a) => (b) => `${a}.mirror(${b});`;

const bonus = (bonus2) => bonus2 ? [bonus2.id, Math.round(bonus2.p * 100)] : [];
const addMagmaCrucible = (recipe$1) => {
  const out = recipe(
    recipe$1.rf,
    recipe$1.input,
    liquid(recipe$1.output)
  );
  return `mods.thermalexpansion.Crucible.addRecipe(${out});`;
};
const removeMagmaCrucible = (input) => `mods.thermalexpansion.Crucible.removeRecipe(${input});`;
const addRedstoneFurnace = (recipe$1) => {
  const out = recipe(
    recipe$1.rf,
    recipe$1.input,
    ingredient(recipe$1.output)
  );
  return `mods.thermalexpansion.Furnace.addRecipe(${out});`;
};
const removeRedstoneFurnace = (input) => `mods.thermalexpansion.Furnace.removeRecipe(${input});`;
const addInsolator = (recipe$1) => {
  const out = recipe(
    recipe$1.rf,
    ingredient(recipe$1.input.left),
    ingredient(recipe$1.input.right),
    ingredient(recipe$1.output),
    ...bonus(recipe$1.bonus)
  );
  return `mods.thermalexpansion.Insolator.addRecipe(${out});`;
};
const removeInsolator = (input) => `mods.thermalexpansion.Insolator.removeRecipe(${recipe(input.left, input.right)});`;
const addPulverizer = (recipe$1) => {
  const out = recipe(
    recipe$1.rf,
    recipe$1.input,
    ingredient(recipe$1.output),
    ...bonus(recipe$1.bonus)
  );
  return `mods.thermalexpansion.Pulverizer.addRecipe(${out});`;
};
const removePulverizer = (input) => `mods.thermalexpansion.Pulverizer.removeRecipe(${input});`;
const addSawmill = (recipe$1) => {
  const out = recipe(
    recipe$1.rf,
    recipe$1.input,
    ingredient(recipe$1.output),
    ...bonus(recipe$1.bonus)
  );
  return `mods.thermalexpansion.Sawmill.addRecipe(${out});`;
};
const removeSawmill = (input) => `mods.thermalexpansion.Sawmill.removeRecipe(${input});`;
const addInductionSmelter = (recipe$1) => {
  const out = recipe(
    recipe$1.rf,
    ingredient(recipe$1.input.left),
    ingredient(recipe$1.input.right),
    ingredient(recipe$1.output),
    ...bonus(recipe$1.bonus)
  );
  return `mods.thermalexpansion.Smelter.addRecipe(${out});`;
};
const removeInductionSmelter = (input) => `mods.thermalexpansion.Smelter.removeRecipe(${recipe(input.left, input.right)});`;
const addTransposerFill = (recipe$1) => {
  const out = recipe(
    recipe$1.rf,
    recipe$1.input,
    ingredient(recipe$1.output),
    liquid(recipe$1.liquid)
  );
  return `mods.thermalexpansion.Transposer.addFillRecipe(${out});`;
};
const removeTransposerFill = (recipe$1) => `mods.thermalexpansion.Transposer.removeFillRecipe(${recipe(recipe$1.input, recipe$1.liquid)});`;
const addTransposerExtract = (recipe$1) => {
  const out = recipe(
    recipe$1.rf,
    recipe$1.input,
    liquid(recipe$1.output),
    ...bonus(recipe$1.bonus)
  );
  return `mods.thermalexpansion.Transposer.addExtractRecipe(${out});`;
};
const removeTransposerExtract = (input) => `mods.thermalexpansion.Transposer.removeExtractRecipe(${input});`;

const addCastingBasin = (recipe$1) => {
  const out = recipe(
    recipe$1.output,
    liquid(recipe$1.input),
    ...cast(recipe$1.cast),
    recipe$1.ticks
  );
  return `mods.tconstruct.Casting.addBasinRecipe(${out});`;
};
const removeCastingBasin = (output) => `mods.tconstruct.Casting.removeBasinRecipe(${output});`;
const addCastingTable = (recipe$1) => {
  const out = recipe(
    recipe$1.output,
    liquid(recipe$1.input),
    ...cast(recipe$1.cast),
    recipe$1.ticks
  );
  return `mods.tconstruct.Casting.addTableRecipe(${out});`;
};
const removeCastingTable = (output) => `mods.tconstruct.Casting.removeTableRecipe(${output});`;
const addDryingRack = (recipe$1) => {
  const out = recipe(
    recipe$1.input,
    recipe$1.output,
    recipe$1.ticks
  );
  return `mods.tconstruct.Drying.addRecipe(${out});`;
};
const removeDryingRack = (output) => `mods.tconstruct.Drying.removeRecipe(${output});`;
const MODIFIER = {
  lvl1: "Tier1Free",
  lvl2: "Tier1.5Free",
  lvl3: "Tier2Free",
  silkTouch: "Silk Touch",
  luck: "Lapis",
  fiery: "Blaze",
  sharpness: "ModAttack",
  beheading: "Beheading",
  diamond: "Diamond",
  reinforced: "Reinforced",
  haste: "Redstone",
  necrotic: "Necrotic",
  emerald: "Emerald",
  smite: "ModSmite",
  knockback: "Piston",
  baneOfAnthropods: "ModAntiSpider",
  flux: "Flux"
};
const removeModifier = (id) => `mods.tconstruct.Modifiers.remove(${literal(id)});`;
const addSmelteryFluid = (recipe$1) => {
  const out = recipe(
    recipe$1.input,
    liquid(recipe$1.output),
    recipe$1.temperature,
    recipe$1.render
  );
  return `mods.tconstruct.Smeltery.addMelting(${out});`;
};
const removeSmelteryFluid = (input) => `mods.tconstruct.Smeltery.removeMelting(${input});`;
const addSmelteryAlloy = (recipe$1) => {
  const output = typeof recipe$1.output === "string" ? { id: recipe$1.output, mb: recipe$1.input.reduce((acc, cur) => acc + cur.mb, 0) } : recipe$1.output;
  const out = recipe(
    liquid(output),
    recipe$1.input.map(liquid)
  );
  return `mods.tconstruct.Smeltery.addAlloy(${out});`;
};
const removeSmelteryAlloy = (output) => `mods.tconstruct.Smeltery.removeAlloy(${output});`;
const addSmelteryFuel = (id) => (recipe$1) => {
  const out = recipe(
    id,
    recipe$1.temperature,
    recipe$1.ticks
  );
  return `mods.tconstruct.Smeltery.addFuel(${out});`;
};
const removeSmelteryFuel = (id) => `mods.tconstruct.Smeltery.removeFuel(${id});`;
const MATERIAL = {
  wood: "Wood",
  stone: "Stone",
  iron: "Iron",
  flint: "Flint",
  cactus: "Cactus",
  bone: "Bone",
  obsidian: "Obsidian",
  alumite: "Alumite",
  netherrack: "Netherrack",
  slimeBlue: "Blue Slime",
  slimeGreen: "Green Slime",
  paper: "Paper",
  cobalt: "Cobalt",
  ardite: "Ardite",
  manyullyn: "Manyullyn",
  copper: "Copper",
  bronze: "Bronze",
  steel: "Steel",
  pigIron: "Pig Iron",
  lead: "Lead",
  silver: "Silver",
  ferrous: "Ferrous",
  shiny: "Shiny",
  electrum: "Electrum",
  invar: "Invar",
  woodMagical: "Magical Wood",
  bedrock: "Bedrockium",
  unstable: "Unstable Induced"
};
const addRepairMaterial = (id) => (recipe$1) => {
  const out = recipe(
    id,
    literal(recipe$1.material),
    recipe$1.n
  );
  return `mods.tconstruct.Tweaks.addRepairMaterial(${out});`;
};
const removeRepairMaterial = (id, material) => {
  const out = recipe(
    id,
    typeof material === "string" && literal(material)
  );
  return `mods.tconstruct.Tweaks.removeRepairMaterial(${out});`;
};
const setMaterialStats = (id) => (stats) => {
  const out = recipe(
    literal(id),
    literal(stats.name),
    stats.level,
    stats.durability,
    stats.speed * 100,
    stats.damage,
    stats.modifier,
    typeof stats.reinforced === "number" ? stats.reinforced : 0,
    typeof stats.stonebound === "number" ? stats.stonebound : 0,
    literal(stats.color.name),
    stats.color.tool
  );
  return `mods.tconstruct.ToolStats.setStats(${out});`;
};
const setMaterialName = (id) => (name) => {
  const out = recipe(
    literal(id),
    literal(name)
  );
  return `mods.tconstruct.ToolStats.setDisplayName(${out});`;
};
const setMaterialMiningLevel = (id) => (n) => {
  const out = recipe(literal(id), n);
  return `mods.tconstruct.ToolStats.setHarvestLevel(${out});`;
};
const setMaterialDurability = (id) => (n) => {
  const out = recipe(literal(id), n);
  return `mods.tconstruct.ToolStats.setDurability(${out});`;
};
const setMaterialSpeed = (id) => (n) => {
  const out = recipe(literal(id), n * 100);
  return `mods.tconstruct.ToolStats.setSpeed(${out});`;
};
const setMaterialDamage = (id) => (n) => {
  const out = recipe(literal(id), n);
  return `mods.tconstruct.ToolStats.setDamage(${out});`;
};
const setMaterialHandleModifier = (id) => (n) => {
  const out = recipe(literal(id), n);
  return `mods.tconstruct.ToolStats.setHandleModifier(${out});`;
};
const setMaterialReinforcedLevel = (id) => (n) => {
  const out = recipe(literal(id), n);
  return `mods.tconstruct.ToolStats.setReinforcedLevel(${out});`;
};
const setMaterialLevelStonebound = (material) => (n) => {
  const out = recipe(literal(material), n);
  return `mods.tconstruct.ToolStats.setStoneboundLevel(${out});`;
};
const setMaterialStyle = (material) => (style) => {
  const out = recipe(
    literal(material),
    literal(style)
  );
  return `mods.tconstruct.ToolStats.setStyle(${out});`;
};
const setBowMaterialStats = (id) => (stats) => {
  const out = recipe(
    literal(id),
    stats.durability,
    stats.drawSpeed,
    float(stats.flightSpeed)
  );
  return `mods.tconstruct.ToolStats.setBowStats(${out});`;
};
const setBowMaterialDurability = (id) => (n) => {
  const out = recipe(literal(id), n);
  return `mods.tconstruct.ToolStats.setBowDurability(${out});`;
};
const setBowMaterialDrawspeed = (id) => (n) => {
  const out = recipe(literal(id), n);
  return `mods.tconstruct.ToolStats.setBowDrawspeed(${out});`;
};
const setBowMaterialFlightSpeed = (id) => (n) => {
  const out = recipe(
    literal(id),
    float(n)
  );
  return `mods.tconstruct.ToolStats.setBowFlightSpeed(${out});`;
};
const setArrowStats = (id) => (stats) => {
  const out = recipe(
    literal(id),
    float(stats.mass),
    float(stats.breakChance * 100),
    float(stats.accuracy * 100)
  );
  return `mods.tconstruct.ToolStats.setArrowStats(${out});`;
};
const setArrowMass = (id) => (n) => {
  const out = recipe(
    literal(id),
    float(n)
  );
  return `mods.tconstruct.ToolStats.setArrowMass(${out});`;
};
const setArrowBreakChance = (id) => (n) => {
  const out = recipe(
    literal(id),
    float(n * 100)
  );
  return `mods.tconstruct.ToolStats.setArrowBreakChance(${out});`;
};
const setArrowAccuracy = (id) => (n) => {
  const out = recipe(
    literal(id),
    float(n * 100)
  );
  return `mods.tconstruct.TooLStats.setArrowAccuracy(${out});`;
};

const addAltar = (recipe$1) => {
  const out = recipe(
    recipe$1.input,
    recipe$1.output,
    recipe$1.tier,
    recipe$1.lp,
    recipe$1.lpt,
    recipe$1.dpt
  );
  return `mods.bloodmagic.Altar.addRecipe(${out});`;
};
const removeAltar = (output) => `mods.bloodmagic.Altar.removeRecipe(${output});`;
const addBloodOrbShaped = (output) => (input) => {
  const out = recipe(
    ingredient(output),
    shaped(input)
  );
  return `mods.bloodmagic.BloodOrb.addShaped(${out});`;
};
const addBloodOrbShapeless = (output) => (input) => {
  const out = recipe(
    ingredient(output),
    array(3)(input)
  );
  return `mods.bloodmagic.BloodOrb.addShapeless(${out});`;
};
const addBloodOrb = (output) => (input) => {
  if (Array.isArray(input)) return addBloodOrbShapeless(output)(input);
  return addBloodOrbShaped(output)(input);
};
const addAlchemy = (recipe$1) => {
  const out = recipe(
    ingredient(recipe$1.output),
    array(3)(recipe$1.input),
    recipe$1.tier,
    recipe$1.lp
  );
  return `mods.bloodmagic.Alchemy.addRecipe(${out});`;
};
const removeAlchemy = (output) => `mods.bloodmagic.Alchemy.removeRecipe(${output});`;
const addRitualBinding = (output) => (input) => `mods.bloodmagic.Binding.addRecipe(${recipe(input, output)});`;
const removeRitualBinding = (output) => `mods.bloodmagic.Binding.removeRecipe(${output});`;
const addRitualMeteor = (recipe$1) => {
  const out = recipe(
    recipe$1.input,
    recipe$1.radius,
    literal(list(Number.MAX_SAFE_INTEGER)(recipe$1.output.map((bonus) => `${bonus.id}, ${bonus.p * 100}`)))
  );
  return `mods.bloodmagic.FallingTower.addFocus(${out});`;
};
const removeRitualMeteor = (input) => `mods.bloodmagic.FallingTower.removeFocus(${input});`;
const addRitualHarvest = (output) => (input) => `mods.bloodmagic.HarvestMoon.addHarvestable(${recipe(output, input)});`;

export { COLOR, ENCHANTMENT, FOCI, HARVESTER_TYPE, MATERIAL, MODIFIER, STYLE, add, addAlchemy, addAltar, addBiomeRubberTree, addBlacklistAutospawner, addBloodOrb, addBloodOrbShaped, addBloodOrbShapeless, addCarpenter, addCastingBasin, addCastingTable, addCentrifuge, addChestLoot, addComposter, addCompressor, addCrucible, addCrucibleFuel, addDryingRack, addExtreme, addFabricator, addFabricatorGlass, addFermenter, addFermenterFuel, addFurnace, addFurnaceFuel, addGrinder, addHammer, addHarvester, addInductionSmelter, addInscriber, addInsolator, addLaser, addLaserFoci, addLaserOre, addMagmaCrucible, addMirror, addMoistener, addOreDict, addPlanter, addPress, addPulverizer, addQED, addRedstoneFurnace, addRepairMaterial, addRitualBinding, addRitualHarvest, addRitualMeteor, addSawmill, addSeed, addShaped, addShapeless, addSieve, addSludgeBoiler, addSmelteryAlloy, addSmelteryFluid, addSmelteryFuel, addSqueezer, addStill, addTransposerExtract, addTransposerFill, createBlock, createItem, createLiquid, createMaterial, hide, joinOreDict, mirrorOreDict, remove, removeAlchemy, removeAltar, removeBiomeRubberTree, removeBlacklistAutospawner, removeCarpenter, removeCastingBasin, removeCastingTable, removeCentrifuge, removeChestLoot, removeComposter, removeCompressor, removeCrucible, removeCrucibleFuel, removeDryingRack, removeExtreme, removeFabricator, removeFabricatorGlass, removeFermenter, removeFermenterFuel, removeFurnace, removeFurnaceFuel, removeGrinder, removeHammer, removeInductionSmelter, removeInsolator, removeLaserFoci, removeLaserOre, removeMagmaCrucible, removeModifier, removeMoistener, removeOreDict, removePressInscriber, removePulverizer, removeQED, removeRedstoneFurnace, removeRepairMaterial, removeRitualBinding, removeRitualMeteor, removeSawmill, removeSeed, removeShaped, removeShapeless, removeSieve, removeSludgeBoiler, removeSmelteryAlloy, removeSmelteryFluid, removeSmelteryFuel, removeSqueezer, removeStill, removeTransposerExtract, removeTransposerFill, rename, setArrowAccuracy, setArrowBreakChance, setArrowMass, setArrowStats, setBowMaterialDrawspeed, setBowMaterialDurability, setBowMaterialFlightSpeed, setBowMaterialStats, setLocalisation, setMaterialDamage, setMaterialDurability, setMaterialHandleModifier, setMaterialLevelStonebound, setMaterialMiningLevel, setMaterialName, setMaterialReinforcedLevel, setMaterialSpeed, setMaterialStats, setMaterialStyle, show, withEnchantment, withName, withTag, withTooltip, withTooltipShift, withWeight };
