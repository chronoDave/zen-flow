import util from 'node:util';

const nullable = (x) => x ?? "null";
const float = (n) => `${n}F`;
const literal = (x) => `"${x}"`;
const weight = (weight2) => (id) => `${id}.weight(${weight2})`;
const list = (n) => (arr) => {
  if (typeof n === "number" && arr.length > n) return `
	${arr.join(",\n	")}
`;
  return arr.join(", ");
};
const array = (n) => (arr) => `[${list(n)(arr)}]`;
const join = (x) => list()(Object.values(x));
const stack = (stack2) => `${stack2.id} * ${stack2.n}`;
const aspect = (stack2) => `${stack2.id} ${stack2.n}`;
const aspects = (stacks) => literal(list()(stacks.map(aspect)));
const bonus = (bonus2) => `${bonus2.id} % ${bonus2.p * 100}`;
const bonusThermal = (bonus2) => join({ id: bonus2.id, p: bonus2.p * 100 });
const liquid = (liquid2) => `${liquid2.id} * ${liquid2.mb}`;
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
  return array(2)(matrix.map((row) => array(3)(row.map(nullable))));
};
const COLOR = {
  black: "\xA70",
  darkBlue: "\xA71",
  darkGreen: "\xA72",
  darkAqua: "\xA73",
  darkRed: "\xA74",
  darkPurple: "\xA75",
  gold: "\xA76",
  gray: "\xA77",
  darkGray: "\xA78",
  blue: "\xA79",
  green: "\xA7a",
  aqua: "\xA7b",
  red: "\xA7c",
  lightPurple: "\xA7d",
  yellow: "\xA7e",
  white: "\xA7f"
};
const STYLE = {
  obfuscated: "\xA7k",
  bold: "\xA7l",
  strikethrough: "\xA7m",
  underline: "\xA7n",
  italic: "\xA7o",
  reset: "\xA7r"
};
const name = (...lines) => literal(lines.map((text) => {
  if (typeof text === "string") return text;
  return [
    text.color && COLOR[text.color],
    text.style && STYLE[text.style],
    text.text,
    (text.color ?? text.style) && STYLE.reset
  ].filter((x) => x !== void 0).join("");
}).join(""));
const tooltip = (...tooltips) => tooltips.map((tooltip2) => {
  if (typeof tooltip2 === "string") return literal(tooltip2);
  let out = literal(tooltip2.text);
  if (tooltip2.style) out = `format.${tooltip2.style}(${out})`;
  if (tooltip2.color) out = `format.${tooltip2.color}(${out})`;
  return out;
}).join(" + ");
const recipe = (...args) => list(3)(
  args.filter((x) => x !== void 0).map((x) => {
    if (Array.isArray(x)) return array(3)(x);
    return nullable(x);
  })
);
const research = (...lines) => lines.map((line) => {
  if (typeof line === "string") return "<LINE>";
  return line.map((text) => {
    if (typeof text === "string") return text;
    if ("src" in text) {
      return `<IMG>${[
        text.src.domain,
        text.src.path,
        text.x ?? 0,
        text.y ?? 0,
        text.w ?? 255,
        text.h ?? 255,
        text.scale ?? 0.0625
      ].join(":")}</IMG>`;
    }
    return [
      text.color && COLOR[text.color],
      text.style && STYLE[text.style],
      text.text,
      (text.color ?? text.style) && "\xA7r"
    ].filter((x) => x !== void 0).join("");
  }).join("");
}).join("<BR>");

const maybe = (fn) => (x) => {
  if (x === null || x === void 0) return void 0;
  return fn(x);
};

const addGrinder = (recipe$1) => {
  const out = recipe(
    ingredient(recipe$1.input),
    ingredient(recipe$1.output),
    recipe$1.turns,
    maybe(join)(recipe$1.bonus?.primary),
    maybe(join)(recipe$1.bonus?.secondary)
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
    recipe$1.input.n,
    recipe$1.input.id,
    recipe$1.exact
  );
  return `mods.avaritia.Compressor.add(${out});`;
};
const removeCompressor = (id) => `mods.avaritia.Compressor.remove(${id});`;
const addExtreme = (output) => (input) => {
  const out = recipe(
    ingredient(output),
    input.map((row) => array(9)(row.map(nullable)))
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
    maybe(literal)(recipe$1.creativeTab),
    typeof recipe$1.renderType === "number" ? recipe$1.renderType : 1,
    recipe$1.drops,
    recipe$1.unbreakable,
    maybe(float)(recipe$1.hardness),
    maybe(float)(recipe$1.lightLevel),
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
    maybe(literal)(recipe$1.color)
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
    maybe(liquid)(recipe$1.liquid),
    recipe$1.ticks,
    recipe$1.top
  );
  return `mods.forestry.Carpenter.addRecipe(${out});`;
};
const removeCarpenter = (output, liquid) => `mods.forestry.Carpenter.removeRecipe(${recipe(output, liquid)});`;
const addCentrifuge = (recipe$1) => {
  const out = recipe(
    recipe$1.output.map(bonus),
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
    bonus(recipe$1.bonus),
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

const addChestLoot = (id) => (loot) => {
  const out = recipe(
    literal(id),
    withWeight(typeof loot.p === "number" ? loot.p * 100 : 100)(loot.id),
    loot.min,
    loot.max
  );
  return `vanilla.loot.addChestLoot(${out});`;
};
const removeChestLoot = (chest) => (id) => {
  const out = recipe(literal(chest), id);
  return `vanilla.loot.removeChestLoot(${out});`;
};
const addSeed = (seed) => {
  const out = withWeight(typeof seed.p === "number" ? seed.p * 100 : 100)(seed.id);
  return `vanilla.seeds.addSeed(${out});`;
};
const removeSeed = (id) => `vanilla.seeds.removeSeed(${id});`;

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
const addFurnace = (recipe$1) => {
  const out = recipe(recipe$1.output, recipe$1.input, recipe$1.xp);
  return `furnace.addRecipe(${out});`;
};
const removeFurnace = (output, input) => {
  if (typeof input === "string") return `furnace.remove(${recipe(output, input)});`;
  return `furnace.remove(${recipe(output)});`;
};
const addFurnaceFuel = (fuel) => (n) => `furnace.setFuel(${recipe(fuel, n)});`;
const removeFurnaceFuel = (fuel) => addFurnaceFuel(fuel)(0);
const setLocalisation = (locale) => (id) => (text) => {
  const out = recipe(
    literal(locale),
    literal(id),
    literal(text)
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
      return bonus(x);
    })),
    literal(HARVESTER_TYPE[recipe$1.type])
  );
  return `mods.mfr.Harvester.addHarvestable(${out});`;
};
const addLaserOre = (id) => (n) => {
  const out = recipe(weight(n)(id));
  return `mods.mfr.MiningLaser.addOre(${out});`;
};
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
    maybe(bonusThermal)(recipe$1.bonus)
  );
  return `mods.thermalexpansion.Insolator.addRecipe(${out});`;
};
const removeInsolator = (input) => `mods.thermalexpansion.Insolator.removeRecipe(${recipe(input.left, input.right)});`;
const addPulverizer = (recipe$1) => {
  const out = recipe(
    recipe$1.rf,
    recipe$1.input,
    ingredient(recipe$1.output),
    maybe(bonusThermal)(recipe$1.bonus)
  );
  return `mods.thermalexpansion.Pulverizer.addRecipe(${out});`;
};
const removePulverizer = (input) => `mods.thermalexpansion.Pulverizer.removeRecipe(${input});`;
const addSawmill = (recipe$1) => {
  const out = recipe(
    recipe$1.rf,
    recipe$1.input,
    ingredient(recipe$1.output),
    maybe(bonusThermal)(recipe$1.bonus)
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
    maybe(bonusThermal)(recipe$1.bonus)
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
    maybe(bonusThermal)(recipe$1.bonus)
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
  const out = recipe(id, maybe(literal)(material));
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
const addRitualBinding = (output) => (input) => {
  const out = recipe(input, output);
  return `mods.bloodmagic.Binding.addRecipe(${out});`;
};
const removeRitualBinding = (output) => `mods.bloodmagic.Binding.removeRecipe(${output});`;
const addRitualMeteor = (recipe$1) => {
  const bonus = recipe$1.output.map((bonus2) => join({ id: bonus2.id, p: bonus2.p * 100 }));
  const out = recipe(
    recipe$1.input,
    recipe$1.radius,
    literal(list()(bonus))
  );
  return `mods.bloodmagic.FallingTower.addFocus(${out});`;
};
const removeRitualMeteor = (input) => `mods.bloodmagic.FallingTower.removeFocus(${input});`;
const addRitualHarvest = (output) => (input) => {
  const out = recipe(output, input);
  return `mods.bloodmagic.HarvestMoon.addHarvestable(${out});`;
};

const ASPECT = {
  aer: "aer",
  terra: "terra",
  ignis: "ignis",
  aqua: "aqua",
  ordo: "ordo",
  perditio: "perditio",
  vacuos: "vacuos",
  lux: "lux",
  tempestas: "tempestas",
  motus: "motus",
  gelum: "gelum",
  vitreus: "vitreus",
  victus: "victus",
  venenum: "venenum",
  potentia: "potentia",
  permutatio: "permutatio",
  metallum: "metallum",
  mortuus: "mortuus",
  volatus: "volatus",
  tenebrae: "tenebrae",
  spiritus: "spiritus",
  sano: "sano",
  iter: "iter",
  alienis: "alienis",
  praecantatio: "praecantatio",
  auram: "auram",
  vitium: "vitium",
  limus: "limus",
  herba: "herba",
  arbor: "arbor",
  bestia: "bestia",
  corpus: "corpus",
  exanimis: "exanimis",
  cognitio: "cognitio",
  sensus: "sensus",
  humanus: "humanus",
  messis: "messis",
  perfodio: "perfodio",
  instrumentum: "instrumentum",
  meto: "meto",
  telum: "telum",
  tutamen: "tutamen",
  fames: "fames",
  lucrum: "lucrum",
  fabrico: "fabrico",
  pannus: "pannus",
  machina: "machina",
  vinculum: "vinculum",
  luxuria: "luxuria",
  infernus: "infernus",
  superbia: "superbia",
  gula: "gula",
  invidia: "invidia",
  desidia: "desidia",
  ira: "ira"
};
const aspectShaped = (x) => {
  const aspects = Object.entries(x).map(([id, n]) => aspect({ id, n }));
  return literal(list()(aspects));
};
const RESEARCH_TAB = {
  basics: "BASICS",
  thaumaturgy: "THAUMATURGY",
  alchemy: "ALCHEMY",
  artifice: "ARTIFICE",
  golemancy: "GOLEMANCY",
  eldritch: "ELDRITCH",
  automagy: "AUTOMAGY",
  forbidden: "FORBIDDEN"
};
const RESEARCH = {
  [RESEARCH_TAB.basics]: {
    warp: "WARP",
    research: "RESEARCH",
    enchant: "ENCHANT",
    nodes: "NODES",
    researchDupe: "RESEARCHDUPE",
    ore: "ORE",
    aspects: "ASPECTS",
    knowfrag: "KNOWFRAG",
    researcher2: "RESEARCHER2",
    crimson: "CRIMSON",
    chestScan: "salisarcana:CHESTSCAN",
    nodeJar: "NODEJAR",
    researcher: "RESEARCHER1",
    nodeTapper2: "NODETAPPER2",
    deconstructor: "DECONSTRUCTOR",
    nodeTapper1: "NODETAPPER1",
    thaumonomicon: "THAUMONOMICON",
    plants: "PLANTS",
    nodePreserve: "NODEPRESERVE",
    pech: "PECH"
  },
  [RESEARCH_TAB.thaumaturgy]: {
    nodeStabilizer: "NODESTABILIZER",
    replaceWandCore: "salisarcana:REPLACEWANDCORE",
    wandPedFoc: "WANDPEDFOC",
    vampBat: "VAMPBAT",
    rodBone: "ROD_bone",
    basicThaumaturgy: "BASICTHAUMATURGY",
    focusExcavation: "FOCUSEXCAVATION",
    sceptre: "SCEPTRE",
    replaceWandCaps: "salisarcana:REPLACEWANDCAPS",
    rodQuartzStaff: "ROD_quartz_staff",
    focusHellBat: "FOCUSHELLBAT",
    visChargeRelay: "VISCHARGERELAY",
    rodIce: "ROD_ice",
    nodeStabilizerAdv: "NODESTABILIZERADV",
    rodReed: "ROD_reed",
    rodGreatwoodStaff: "ROD_greatwood_staff",
    focusDisenchanting: "salisarcana:FOCUS_DISENCHANTING",
    rodSilverwoodStaff: "ROD_silverwood_staff",
    focusFrost: "FOCUSFROST",
    visAmulet: "VISAMULET",
    focalManipulation: "FOCALMANIPULATION",
    focusFire: "FOCUSFIRE",
    capGold: "CAP_gold",
    rodSilverwood: "ROD_silverwood",
    visPower: "VISPOWER",
    focusPouch: "FOCUSPOUCH",
    capCopper: "CAP_copper",
    rodReedStaff: "ROD_reed_staff",
    focusShock: "FOCUSSHOCK",
    capSilver: "CAP_silver",
    rodQuartz: "ROD_quartz",
    capIron: "CAP_iron",
    focusWarding: "FOCUSWARDING",
    rodObsidian: "ROD_obsidian",
    focusPortableHole: "FOCUSPORTABLEHOLE",
    capThaumium: "CAP_thaumium",
    rodWood: "ROD_wood",
    rodGreatwood: "ROD_greatwood",
    rodBlaze: "ROD_blaze",
    rodBoneStaff: "ROD_bone_staff",
    rodObsidianStaff: "ROD_obsidian_staff",
    focusTrade: "FOCUSTRADE",
    rodIceStaff: "ROD_ice_staff",
    wandPed: "WANDPED",
    rodBlazeStaff: "ROD_blaze_staff"
  },
  [RESEARCH_TAB.alchemy]: {
    alumentum: "ALUMENTUM",
    bathSalts: "BATHSALTS",
    crucible: "CRUCIBLE",
    entropicProcessing: "ENTROPICPROCESSING",
    transIron: "TRANSIRON",
    thaumatorium: "THAUMATORIUM",
    alchemicManufacture: "ALCHEMICALMANUFACTURE",
    liquidDeath: "LIQUIDDEATH",
    tubes: "TUBES",
    transTin: "TRANSTIN",
    saneSoap: "SANESOAP",
    etherealBloom: "ETHEREALBLOOM",
    tallow: "TALLOW",
    pureSilver: "PURESILVER",
    pureTin: "PURETIN",
    transCopper: "TRANSCOPPER",
    essentiaCrystal: "ESSENTIACRYSTAL",
    arcaneSpa: "ARCANESPA",
    centrifuge: "CENTRIFUGE",
    transSilver: "TRANSSILVER",
    pureIron: "PUREIRON",
    alchemicaDuplication: "ALCHEMICALDUPLICATION",
    jarVoid: "JARVOID",
    nitor: "NITOR",
    bottleTaint: "BOTTLETAINT",
    pureGold: "PUREGOLD",
    distillEssentia: "DISTILESSENTIA",
    phial: "PHIAL",
    tubeFilter: "TUBEFILTER",
    pureLead: "PURELEAD",
    thaumium: "THAUMIUM",
    transLead: "TRANSLEAD",
    transGold: "TRANSGOLD",
    pureCopper: "PURECOPPER",
    jarLabel: "JARLABEL"
  },
  [RESEARCH_TAB.artifice]: {
    runicEmergency: "RUNICEMERGENCY",
    goggles: "GOGGLES",
    enchFabric: "ENCHFABRIC",
    elementalPick: "ELEMENTALPICK",
    elementalAxe: "ELEMENTALAXE",
    table: "TABLE",
    infernalFurnace: "INFERNALFURNACE",
    banners: "BANNERS",
    elementalShovel: "ELEMENTALSHOVEL",
    levitator: "LEVITATOR",
    hoverGirdle: "HOVERGIRDLE",
    wardenArcana: "WARDEDARCANA",
    basicArtifice: "BASICARTIFACE",
    fluxScrub: "FLUXSCRUB",
    thaumometer: "THAUMOMETER",
    bootsTraveller: "BOOTSTRAVELLER",
    restable: "RESTABLE",
    mirrorEssentia: "MIRRORESSENTIA",
    primalArrow: "PRIMALARROW",
    arcaneEar: "ARCANEEAR",
    grate: "GRATE",
    runicCharged: "RUNICCHARGED",
    runicHealing: "RUNICHEALING",
    hoverHarness: "HOVERHARNESS",
    mirror: "MIRROR",
    lampGrowth: "LAMPGROWTH",
    maskGrinningDevil: "MASKGRINNINGDEVIL",
    elementalHoe: "ELEMENTALHOE",
    mirrorHand: "MIRRORHAND",
    arcTable: "ARCTABLE",
    infusion: "INFUSION",
    runicKinetic: "RUNICKINETIC",
    paveWard: "PAVEWARD",
    maskAngryGhost: "MASKANGRYGHOST",
    maskSippingFiend: "MASKSIPPINGFIEND",
    arcaneLamp: "ARCANELAMP",
    armorFortress: "ARMORFORTRESS",
    bellow: "BELLOWS",
    helmGoggles: "HELMGOGGLES",
    runicArmor: "RUNICARMOR",
    runicAugmentation: "RUNICAUGMENTATION",
    lampFertility: "LAMPFERTILITY",
    boneBow: "BONEBOW",
    arcaneStone: "ARCANESTONE",
    sinStone: "SINSTONE",
    elementalSword: "ELEMENTALSWORD",
    paveTravel: "PAVETRAVEL",
    jarBrain: "JARBRAIN",
    arcaneBore: "ARCANEBORE",
    infusionEnchantment: "INFUSIONENCHANTMENT"
  },
  [RESEARCH_TAB.golemancy]: {
    golemClay: "GOLEMCLAY",
    upgradeWater: "UPGRADEWATER",
    hungryChest: "HUNGRYCHEST",
    golemTallow: "GOLEMTALLOW",
    golemWood: "GOLEMWOOD",
    golemFlesh: "GOLEMFLESH",
    upgradeEarth: "UPGRADEEARTH",
    tinyDart: "TINYDART",
    upgradeFire: "UPGRADEFIRE",
    upgradeEntropy: "UPGRADEENTROPY",
    coreUse: "COREUSE",
    tinyHammer: "TINYHAMMER",
    travelTrunk: "TRAVELTRUNK",
    tinyBowtie: "TINYBOWTIE",
    golemBell: "GOLEMBELL",
    coreSorting: "CORESORTING",
    golemThaumium: "GOLEMTHAUMIUM",
    tinyHat: "TINYHAT",
    tinyFez: "TINYFEZ",
    coreLumber: "CORELUMBER",
    tinyGlasses: "TINYGLASSES",
    tinyVisor: "TINYVISOR",
    upgradeAir: "UPGRADEAIR",
    coreFishing: "COREFISHING",
    coreGather: "COREGATHER",
    coreHarvest: "COREHARVEST",
    coreButcher: "COREBUTCHER",
    coreGuard: "COREGUARD",
    advancedGolem: "ADVANCEDGOLEM",
    tinyArmor: "TINYARMOR",
    coreFill: "COREFILL",
    golemFetter: "GOLEMFETTER",
    golemStraw: "GOLEMSTRAW",
    corealAlchemy: "COREALCHEMY",
    golemStone: "GOLEMSTONE",
    golemIron: "GOLEMIRON",
    coreLiquid: "CORELIQUID",
    coreEmpty: "COREEMPTY",
    upgradeOrder: "UPGRADEORDER"
  },
  [RESEARCH_TAB.eldritch]: {
    eldritchMajor: "ELDRITCHMAJOR",
    advAlchemyFurnace: "ADVALCHEMYFURNACE",
    armorVoidFortress: "ARMORVOIDFORTRESS",
    eldritchMinor: "ELDRITCHMINOR",
    enterOuter: "ENTEROUTER",
    focusPrimal: "FOCUSPRIMAL",
    essentiaReservoir: "ESSENTIARESERVOIR",
    sanityCheck: "SANITYCHECK",
    rodPrimalStaff: "ROD_primal_staff",
    oculus: "OCULUS",
    outerRev: "OUTERREV",
    primalCrusher: "PRIMALCRUSHER",
    primPearl: "PRIMPEARL",
    primNode: "PRIMNODE",
    capVoid: "CAP_void",
    voidMetal: "VOIDMETAL"
  },
  [RESEARCH_TAB.automagy]: {
    redCrystal: "REDCRYSTAL",
    golemLinker: "GOLEMLINKER",
    netherruneWisp: "NETHERRUNE_WISP",
    mobLure: "MOBLURE",
    dimensionLure: "DIMENSIONLURE",
    advNodeJar: "ADVNODEJAR",
    tallyBlockLens: "TALLYBLOCK_LENS",
    netherruneGhast: "NETHERRUNE_GHAST",
    netherruneBat: "NETHERRUNE_BAT",
    sliversTravel: "SLIVERS_TRAVEL",
    remoteComparator: "REMOTECOMPARATOR",
    essentiaLocusAggregator: "ESSENTIALOCUSAGGREGATOR",
    mirrorInput: "MIRRORINPUT",
    redCrystalDim: "REDCRYSTAL_DIM",
    redCrystalMirrorbound: "REDCRYSTAL_MIRRORBOUND",
    thirstyTank: "THIRSTYTANK",
    eagerChest: "EAGERCHEST",
    thirstyTankGlyphBovine: "THIRSTYTANK_GLYPH_BOVINE",
    netherruneLight: "NETHERRUNE_LIGHT",
    hungryMaw: "HUNGRYMAW",
    alchemyBoiler: "ALCHEMYBOILER",
    entitySignal: "ENTITYSIGNAL",
    netherruneSlime: "NETHERRUNE_SLIME",
    netherruneZombie: "NETHERRUNE_ZOMBIE",
    xpStone: "XPSTONE",
    greedyChest: "GREEDYCHEST",
    golemWorkbench: "GOLEMWORKBENCH",
    netherruneSoul: "NETHERRUNE_SOUL",
    mirrorMultiDest: "MIRRORMULTIDEST",
    enderDisjunction: "ENDERDISJUNCTION",
    invetariumDelivery: "INVENTARIUM_DELIVERY",
    slivers: "SLIVERS",
    enchantFishing: "ENCHANT_FISHING",
    netherruneCelerity: "NETHERRUNE_CELERITY",
    thirstyTankGlyph: "THIRSTYTANK_GLYPH",
    crystalBrain: "CRYSTALBRAIN",
    vishroomSoup: "VISHROOMSOUP",
    nitorLight: "NITORLIGHT",
    inventarium: "INVENTARIUM",
    inventariumPointer: "INVENTARIUM_POINTER",
    redCrystalRez: "REDCRYSTAL_RES",
    entropicRefining: "ENTROPICREFINING",
    golemWorkbenchUpgrade: "GOLEMWORKBENCH_UPGRADE",
    focusCrafting: "FOCUSCRAFTING",
    enchantedPaper: "ENCHANTEDPAPER",
    autoHandMirror: "AUTOHANDMIRROR",
    redstoneTheory: "REDSTONETHEORY",
    netherruneSkeleton: "NETHERRUNE_SKELETON",
    essentiaLocus: "ESSENTIALOCUS",
    magicHourglass: "MAGICHOURGLASS",
    amnesiaStone: "AMNESIASTONE",
    focusCraftingUpgrade: "FOCUSCRAFTING_UPGRADE",
    redCrystalAmp: "REDCRYSTAL_AMP",
    inventarumExtra: "INVENTARIUM_EXTRA",
    netherruneCrystal: "NETHERRUNE_CRYSTAL",
    thaumostaticRefueler: "THAUMOSTATICREFUELER",
    tallyBlock: "TALLYBLOCK",
    netherMind: "NETHERMIND",
    visReader: "VISREADER",
    finiCalMaw: "FINICALMAW",
    avaricious: "AVARICIOUS",
    tenaciousChest: "TENACIOUSCHEST",
    redCrystalDense: "REDCRYSTAL_DENSE",
    sliversWarding: "SLIVERS_WARDING",
    golemInhibitor: "GOLEMINHIBITOR"
  },
  [RESEARCH_TAB.forbidden]: {
    skullAxe: "SKULLAXE",
    bloodRapier: "BLOODRAPIER",
    arcaneCake: "ARCANECAKE",
    taintPick: "TAINTPICK",
    taintTree: "TAINTTREE",
    wrath: "WRATH",
    schools: "SCHOOLS",
    transEmerald: "TRANSEMERALD",
    hellFire: "HELLFIRE",
    voidToucher: "VOIDTOUCHED",
    rodTainted: "ROD_tainted",
    eldritchOrb: "ELDRITCHORB",
    bloodWell: "BLOODWELL",
    consuming: "CONSUMING",
    cluster: "CLUSTER",
    subCollar: "SUBCOLLAR",
    bloodMagic: "BLOODMAGIC",
    rodInfernal: "ROD_infernal",
    crystalWell: "CRYSTALWELL",
    fork: "FORK",
    rodBloodStaff: "ROD_blood_staff",
    ringFood: "RINGFOOD",
    corrupting: "CORRUPTING",
    taintStone: "TAINTSTONE",
    rodBlood: "ROD_blood",
    capAlchemical: "CAP_alchemical",
    ridingCrop: "RIDINGCROP",
    netherShards: "NETHERSHARDS",
    primeWell: "PRIMEWELL",
    greedy: "GREEDY",
    educational: "EDUCATIONAL",
    rodProfane: "ROD_profane",
    impact: "IMPACT",
    wrathCage: "WRATHCAGE",
    blackFlower: "BLACKFLOWER",
    morphTools: "MORPHTOOLS",
    taintShovel: "TAINTSHOVEL",
    focusBlink: "FOCUSBLINK"
  }
};
const addArcaneShaped = (recipe$1) => {
  const out = recipe(
    literal(recipe$1.research ?? RESEARCH[RESEARCH_TAB.basics].aspects),
    ingredient(recipe$1.output),
    maybe(aspectShaped)(recipe$1.aspects),
    shaped(recipe$1.input)
  );
  return `mods.thaumcraft.Arcane.addShaped(${out});`;
};
const addArcaneShapeless = (recipe$1) => {
  const out = recipe(
    literal(recipe$1.research ?? RESEARCH[RESEARCH_TAB.basics].aspects),
    ingredient(recipe$1.output),
    maybe(aspectShaped)(recipe$1.aspects),
    array(3)(recipe$1.input)
  );
  return `mods.thaumcraft.Arcane.addShapeless(${out});`;
};
const addArcane = (recipe) => {
  if (Array.isArray(recipe.input)) return addArcaneShapeless(recipe);
  return addArcaneShaped(recipe);
};
const removeArcane = (output) => `mods.thaumcraft.Arcane.removeRecipe(${output});`;
const addAspectItem = (id) => (aspects$1) => `mods.thaumcraft.Aspects.add(${recipe(id, aspects(aspects$1))});`;
const setAspectItem = (id) => (aspects$1) => `mods.thaumcraft.Aspects.set(${recipe(id, aspects(aspects$1))});`;
const removeAspectItem = (id) => (aspects$1) => `mods.thaumcraft.Aspects.remove(${recipe(id, aspects(aspects$1))});`;
const addAspectEntity = (id) => (aspects$1) => `mods.thaumcraft.Aspects.addEntity(${recipe(literal(id), aspects(aspects$1))});`;
const setAspectEntity = (id) => (aspects$1) => `mods.thaumcraft.Aspects.setEntity(${recipe(literal(id), aspects(aspects$1))});`;
const removeAspectEntity = (id) => (aspects$1) => `mods.thaumcraft.Aspects.removeEntity(${recipe(literal(id), aspects(aspects$1))});`;
const addCrucibleAlchemy = (recipe$1) => {
  const out = recipe(
    literal(recipe$1.research),
    ingredient(recipe$1.output),
    recipe$1.input,
    aspects(recipe$1.aspects)
  );
  return `mods.thaumcraft.Crucible.addRecipe(${out});`;
};
const removeCrucibleAlchemy = (output) => `mods.thaumcraft.Crucible.removeRecipe(${output});`;
const addInfusion = (recipe$1) => {
  const out = recipe(
    literal(recipe$1.research),
    recipe$1.input,
    array(3)(recipe$1.catalysts),
    aspects(recipe$1.aspects),
    ingredient(recipe$1.output),
    recipe$1.instability
  );
  return `mods.thaumcraft.Infusion.addRecipe(${out});`;
};
const removeInfusion = (id) => `mods.thaumcraft.Infusion.removeRecipe(${id});`;
const addInfusionEnchantment = (recipe$1) => {
  const out = recipe(
    literal(recipe$1.research),
    recipe$1.enchantment,
    recipe$1.instability,
    aspects(recipe$1.aspects),
    array(3)(recipe$1.catalysts)
  );
  return `mods.thaumcraft.Infusion.addEnchantment(${out});`;
};
const removeInfusionEnchantment = (id) => `mods.thaumcraft.Infusion.removeEnchant(${id});`;
const addLoot = (type) => (bonus) => `mods.thaumcraft.Loot.add${type}Loot(${recipe(bonus.id, bonus.p * 100)});`;
const addLootCommon = addLoot("Common");
const addLootUncommon = addLoot("Uncommon");
const addLootRare = addLoot("Rare");
const removeLoot = (type) => (id) => `mods.thaumcraft.Loot.remove${type}Loot(${id});`;
const removeLootCommon = removeLoot("Common");
const removeLootUncommon = removeLoot("Uncommon");
const removeLootRare = removeLoot("Rare");
const addWarpResearch = (research) => (warp) => `mods.thaumcraft.Warp.addToResearch(${recipe(literal(research), warp)});`;
const addWarpItem = (id) => (warp) => `mods.thaumcraft.Warp.addToItem(${recipe(id, warp)});`;
const removeWarpResearch = (research) => {
  if (typeof research !== "string") return "mods.thaumcraft.Warp.removeAllResearch();";
  return `mods.thaumcraft.Warp.removeFromResearch(${literal(research)});`;
};
const removeWarpItem = (id) => {
  if (typeof id !== "string") return "mods.thaumcraft.Warp.removeAllItems();";
  return `mods.thaumcraft.Warp.removeFromItem(${id});`;
};
const removeWarp = () => "mods.thaumcraft.Warp.removeAll();";
const orphanResearch = (research) => `mods.thaumcraft.Research.orphanResearch(${literal(research)});`;
const removeResearch = (research) => `mods.thaumcraft.Research.removeResearch(${literal(research)});`;
const removeResearchTab = (tab) => `mods.thaumcraft.Research.removeTab(${literal(tab)});`;
const addResearchTab = (recipe$1) => {
  const out = recipe(
    literal(recipe$1.id),
    literal(recipe$1.icon.domain),
    literal(recipe$1.icon.path),
    maybe(literal)(recipe$1.bg?.domain),
    maybe(literal)(recipe$1.bg?.path)
  );
  return `mods.thaumcraft.Research.addTab(${out});`;
};
const addResearch = (recipe$1) => {
  const out = recipe(
    literal(recipe$1.id),
    literal(recipe$1.tab),
    maybe(aspects)(recipe$1.aspects) ?? null,
    recipe$1.x,
    recipe$1.y,
    recipe$1.complexity,
    typeof recipe$1.icon === "string" ? recipe$1.icon : literal(recipe$1.icon.domain),
    typeof recipe$1.icon !== "string" ? literal(recipe$1.icon.path) : void 0
  );
  return `mods.thaumcraft.Research.addResearch(${out});`;
};
const addResearchPage = (research) => (id) => `mods.thaumcraft.Research.addPage(${recipe(literal(research), literal(`tc.research_page.${id}`))});`;
const addResearchPageCraftable = (type) => (research) => (id) => `mods.thaumcraft.Research.add${type}Page(${recipe(literal(research), id)});`;
const addResearchPageCrafting = addResearchPageCraftable("Crafting");
const addResearchPageArcane = addResearchPageCraftable("Arcane");
const addResearchPageCrucible = addResearchPageCraftable("Crucible");
const addResearchPageInfusion = addResearchPageCraftable("Infusion");
const addResearchPageEnchantment = (research) => (enchantment) => `mods.thaumcraft.Research.addEnchantmentPage(${recipe(literal(research), enchantment)});`;
const addResearchParent = (research) => (parent) => {
  const out = recipe(
    literal(research),
    literal(typeof parent === "string" ? parent : parent.id),
    typeof parent === "string" ? false : parent.hidden
  );
  return `mods.thaumcraft.Research.addPrereq(${out});`;
};
const addResearchSibling = (research) => (sibling) => `mods.thaumcraft.Research.addSibling(${recipe(literal(research), literal(sibling))});`;
const removeResearchParent = (research) => `mods.thaumcraft.Research.clearPrereqs(${literal(research)});`;
const removeResearchSibling = (research) => `mods.thaumcraft.Research.clearSiblings(${literal(research)});`;
const setResearchType = (type) => (research) => (enabled) => `mods.thaumcraft.Research.set${type}(${recipe(literal(research), enabled)});`;
const setResearchTypeRound = setResearchType("Round");
const setResearchTypeSpikey = setResearchType("Spikey");
const setResearchTypeStub = setResearchType("Stub");
const setResearchTypeSecondary = setResearchType("Secondary");
const setResearchTypeVirtual = setResearchType("Virtual");
const setResearchTypeAuto = setResearchType("AutoUnlock");
const setResearchTypeHidden = setResearchType("Concealed");
const setResearchAspects = (research) => (aspects$1) => `mods.thaumcraft.Research.setAspects(${recipe(literal(research), aspects(aspects$1))});`;
const setResearchComplexity = (research) => (complexity) => `mods.thaumcraft.Research.setComplexity(${recipe(literal(research), complexity)});`;
const resetResearch = (research) => `mods.thaumcraft.Research.clearPages(${literal(research)});`;
const refreshResearch = (research) => `mods.thaumcraft.Research.refreshResearchRecipe(${literal(research)});`;
const moveResearch = (tab) => (recipe$1) => {
  const out = recipe(
    literal(recipe$1.research),
    literal(tab),
    recipe$1.x,
    recipe$1.y
  );
  return `mods.thaumcraft.Research.moveResearch(${out});`;
};

export { ASPECT, COLOR, ENCHANTMENT, FOCI, HARVESTER_TYPE, MATERIAL, MODIFIER, RESEARCH, RESEARCH_TAB, STYLE, add, addAlchemy, addAltar, addArcane, addArcaneShaped, addArcaneShapeless, addAspectEntity, addAspectItem, addBiomeRubberTree, addBlacklistAutospawner, addBloodOrb, addBloodOrbShaped, addBloodOrbShapeless, addCarpenter, addCastingBasin, addCastingTable, addCentrifuge, addChestLoot, addComposter, addCompressor, addCrucible, addCrucibleAlchemy, addCrucibleFuel, addDryingRack, addExtreme, addFabricator, addFabricatorGlass, addFermenter, addFermenterFuel, addFurnace, addFurnaceFuel, addGrinder, addHammer, addHarvester, addInductionSmelter, addInfusion, addInfusionEnchantment, addInscriber, addInsolator, addLaserFoci, addLaserOre, addLootCommon, addLootRare, addLootUncommon, addMagmaCrucible, addMirror, addMoistener, addOreDict, addPlanter, addPress, addPulverizer, addQED, addRedstoneFurnace, addRepairMaterial, addResearch, addResearchPage, addResearchPageArcane, addResearchPageCrafting, addResearchPageCrucible, addResearchPageEnchantment, addResearchPageInfusion, addResearchParent, addResearchSibling, addResearchTab, addRitualBinding, addRitualHarvest, addRitualMeteor, addSawmill, addSeed, addShaped, addShapeless, addSieve, addSludgeBoiler, addSmelteryAlloy, addSmelteryFluid, addSmelteryFuel, addSqueezer, addStill, addTransposerExtract, addTransposerFill, addWarpItem, addWarpResearch, createBlock, createItem, createLiquid, createMaterial, research as formatResearch, hide, joinOreDict, mirrorOreDict, moveResearch, orphanResearch, refreshResearch, remove, removeAlchemy, removeAltar, removeArcane, removeAspectEntity, removeAspectItem, removeBiomeRubberTree, removeBlacklistAutospawner, removeCarpenter, removeCastingBasin, removeCastingTable, removeCentrifuge, removeChestLoot, removeComposter, removeCompressor, removeCrucible, removeCrucibleAlchemy, removeCrucibleFuel, removeDryingRack, removeExtreme, removeFabricator, removeFabricatorGlass, removeFermenter, removeFermenterFuel, removeFurnace, removeFurnaceFuel, removeGrinder, removeHammer, removeInductionSmelter, removeInfusion, removeInfusionEnchantment, removeInsolator, removeLaserFoci, removeLaserOre, removeLootCommon, removeLootRare, removeLootUncommon, removeMagmaCrucible, removeModifier, removeMoistener, removeOreDict, removePressInscriber, removePulverizer, removeQED, removeRedstoneFurnace, removeRepairMaterial, removeResearch, removeResearchParent, removeResearchSibling, removeResearchTab, removeRitualBinding, removeRitualMeteor, removeSawmill, removeSeed, removeShaped, removeShapeless, removeSieve, removeSludgeBoiler, removeSmelteryAlloy, removeSmelteryFluid, removeSmelteryFuel, removeSqueezer, removeStill, removeTransposerExtract, removeTransposerFill, removeWarp, removeWarpItem, removeWarpResearch, rename, resetResearch, setArrowAccuracy, setArrowBreakChance, setArrowMass, setArrowStats, setAspectEntity, setAspectItem, setBowMaterialDrawspeed, setBowMaterialDurability, setBowMaterialFlightSpeed, setBowMaterialStats, setLocalisation, setMaterialDamage, setMaterialDurability, setMaterialHandleModifier, setMaterialLevelStonebound, setMaterialMiningLevel, setMaterialName, setMaterialReinforcedLevel, setMaterialSpeed, setMaterialStats, setMaterialStyle, setResearchAspects, setResearchComplexity, setResearchTypeAuto, setResearchTypeHidden, setResearchTypeRound, setResearchTypeSecondary, setResearchTypeSpikey, setResearchTypeStub, setResearchTypeVirtual, show, withEnchantment, withName, withTag, withTooltip, withTooltipShift, withWeight };
