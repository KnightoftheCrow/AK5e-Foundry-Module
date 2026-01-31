import { registerCharacterSheet } from "./character-sheet.mjs";
import NationalityData from "./nationalityData.mjs";

function addTabs() {
    const tabs = dnd5e.applications.CompendiumBrowser.TABS;
    const NationalityTab = {
        tab: "nationality",
        label: "TYPES.Item.ak5e.NationalityPl",
        svg: "modules/ak5e/icons/nationality/nationality.svg",
        documentClass: "Item",
        types: ["ak5e.nationality"]
    }
    tabs.splice(4, 0, NationalityTab);
}

Hooks.once("init", () => { 
  
	// Add ak5e item properties and push to validProperties so they're available on item sheets
	const ak5eItemProps = {
    	bnd: "ak5e.weaponProperties.weaponPropBound",
    	brc: "ak5e.weaponProperties.weaponPropBrace",
    	cst: "ak5e.weaponProperties.weaponPropCasting",
    	cnd: "ak5e.weaponProperties.weaponPropConductive",
    	chc: "ak5e.weaponProperties.weaponPropCouch",
    	ded: "ak5e.weaponProperties.weaponPropDeadly",
    	frm: "ak5e.weaponProperties.weaponPropFirearm",
    	crs: "ak5e.weaponProperties.weaponPropCrush",
    	rpd: "ak5e.weaponProperties.weaponPropRapidFire",
		spl: "ak5e.weaponProperties.weaponPropSplash",
		spd: "ak5e.weaponProperties.weaponPropSpread",
    };
  
	for (const [k, v] of Object.entries(ak5eItemProps)) {
    	CONFIG.DND5E.itemProperties[k] = { label: v };
    	CONFIG.DND5E.validProperties.weapon.add(k);
    };
  
	// Removes the default Firearm Property so there's no overlap for possible automation
    CONFIG.DND5E.validProperties.weapon.delete("fir");
  
	// Adds AK5e Weapon Types
	CONFIG.DND5E.weaponTypes.lightM = "Light Melee"
	CONFIG.DND5E.weaponTypes.heavyM = "Heavy Melee"
    CONFIG.DND5E.weaponTypes.specialM = "Special Melee"
	CONFIG.DND5E.weaponTypes.lightR = "Light Ranged"
	CONFIG.DND5E.weaponTypes.heavyR = "Heavy Ranged"
	CONFIG.DND5E.weaponTypes.specialR = "Special Ranged"
	
	// Adds AK5e Weapon Proficiencies
	CONFIG.DND5E.weaponProficiencies.ltm = "Light Melee"
	CONFIG.DND5E.weaponProficiencies.hvm = "Heavy Melee"
	CONFIG.DND5E.weaponProficiencies.spm = "Special Melee"
	CONFIG.DND5E.weaponProficiencies.ltr = "Light Ranged"
	CONFIG.DND5E.weaponProficiencies.hvr = "Heavy Ranged"
	CONFIG.DND5E.weaponProficiencies.spr = "Special Ranged"
	
	// Maps AK5e Weapon Profs
	CONFIG.DND5E.weaponProficienciesMap.lightM = "ltm"
	CONFIG.DND5E.weaponProficienciesMap.heavyM = "hvm"
	CONFIG.DND5E.weaponProficienciesMap.specialM = "spm"
	CONFIG.DND5E.weaponProficienciesMap.lightR = "ltr"
	CONFIG.DND5E.weaponProficienciesMap.heavyR = "hvr"
	CONFIG.DND5E.weaponProficienciesMap.specialR = "spr"
	
	// AK5e Weapon Type Maps
	CONFIG.DND5E.weaponTypeMap.lightM = "melee"
	CONFIG.DND5E.weaponTypeMap.heavyM = "melee"
	CONFIG.DND5E.weaponTypeMap.specialM = "melee"
	CONFIG.DND5E.weaponTypeMap.lightR = "ranged"
	CONFIG.DND5E.weaponTypeMap.heavyR = "ranged"
	CONFIG.DND5E.weaponTypeMap.specialR = "ranged"
		
	// Removes default 5e Weapon Types
	delete CONFIG.DND5E.weaponTypes.simpleM;
	delete CONFIG.DND5E.weaponTypes.martialM;
	delete CONFIG.DND5E.weaponTypes.simpleR;
	delete CONFIG.DND5E.weaponTypes.martialR;
	
	// Removes default 5e Weapon Profs
	delete CONFIG.DND5E.weaponProficiencies.sim;
	delete CONFIG.DND5E.weaponProficiencies.mar;
	
	// Removes default 5e Weapons
	delete CONFIG.DND5E.weaponIds.battleaxe;
	delete CONFIG.DND5E.weaponIds.blowgun;
	delete CONFIG.DND5E.weaponIds.club;
	delete CONFIG.DND5E.weaponIds.dagger;
	delete CONFIG.DND5E.weaponIds.dart;
	delete CONFIG.DND5E.weaponIds.flail;
	delete CONFIG.DND5E.weaponIds.glaive;
	delete CONFIG.DND5E.weaponIds.greataxe;
	delete CONFIG.DND5E.weaponIds.greatclub;
	delete CONFIG.DND5E.weaponIds.greatsword;
	delete CONFIG.DND5E.weaponIds.halberd;
	delete CONFIG.DND5E.weaponIds.handaxe;
	delete CONFIG.DND5E.weaponIds.handcrossbow;
	delete CONFIG.DND5E.weaponIds.heavycrossbow;
	delete CONFIG.DND5E.weaponIds.javelin;
	delete CONFIG.DND5E.weaponIds.lance;
	delete CONFIG.DND5E.weaponIds.lightcrossbow;
	delete CONFIG.DND5E.weaponIds.lighthammer;
	delete CONFIG.DND5E.weaponIds.longbow;
	delete CONFIG.DND5E.weaponIds.longsword;
	delete CONFIG.DND5E.weaponIds.mace;
	delete CONFIG.DND5E.weaponIds.maul;
	delete CONFIG.DND5E.weaponIds.morningstar;
	delete CONFIG.DND5E.weaponIds.musket;
	delete CONFIG.DND5E.weaponIds.pike;
	delete CONFIG.DND5E.weaponIds.pistol;
	delete CONFIG.DND5E.weaponIds.quarterstaff;
	delete CONFIG.DND5E.weaponIds.rapier;
	delete CONFIG.DND5E.weaponIds.scimitar;
	delete CONFIG.DND5E.weaponIds.shortsword;
	delete CONFIG.DND5E.weaponIds.sickle;
	delete CONFIG.DND5E.weaponIds.spear;
	delete CONFIG.DND5E.weaponIds.shortbow;
	delete CONFIG.DND5E.weaponIds.sling;
	delete CONFIG.DND5E.weaponIds.trident;
	delete CONFIG.DND5E.weaponIds.warpick;
	delete CONFIG.DND5E.weaponIds.warhammer;
	delete CONFIG.DND5E.weaponIds.whip;
	
	// Add ak5e weapon IDs
	CONFIG.DND5E.weaponIds.artsstaff =
    "Compendium.ak5e.ak5e-items.Item.8YnvqZkWkp8JrS0y";
	CONFIG.DND5E.weaponIds.artswand =
    "Compendium.ak5e.ak5e-items.Item.KjYWdRFtdaAGe4yK";
	CONFIG.DND5E.weaponIds.axe =
    "Compendium.ak5e.ak5e-items.Item.FPznW6rW4nghDh1r";
	CONFIG.DND5E.weaponIds.hammer =
    "Compendium.ak5e.ak5e-items.Item.yRwC4x79xE5iUW7K";
	CONFIG.DND5E.weaponIds.knife =
    "Compendium.ak5e.ak5e-items.Item.EXF9dlqFHPDHi3KF";
	CONFIG.DND5E.weaponIds.spear =
    "Compendium.ak5e.ak5e-items.Item.gQexKnwZdkamQcJ7";
	CONFIG.DND5E.weaponIds.sword =
    "Compendium.ak5e.ak5e-items.Item.Ve5i7MSi8dzq0UJG";
	CONFIG.DND5E.weaponIds.whip =
    "Compendium.ak5e.ak5e-items.Item.nkDWWkosdoJz2U6i";
	CONFIG.DND5E.weaponIds.greataxe =
    "Compendium.ak5e.ak5e-items.Item.fPUfPJOelKu6a97f";
	CONFIG.DND5E.weaponIds.greatsword =
    "Compendium.ak5e.ak5e-items.Item.RVaNysRBX2kS1VKR";
	CONFIG.DND5E.weaponIds.heavyhammer =
    "Compendium.ak5e.ak5e-items.Item.a0RPD5m4b1rj0cQT";
	CONFIG.DND5E.weaponIds.polearm =
    "Compendium.ak5e.ak5e-items.Item.XAvfUySa6K27SHTU";
	CONFIG.DND5E.weaponIds.bow =
    "Compendium.ak5e.ak5e-items.Item.AVXlB27KScRknIiD";
	CONFIG.DND5E.weaponIds.crossbow =
    "Compendium.ak5e.ak5e-items.Item.o1kUk2al1bphk50J";
	CONFIG.DND5E.weaponIds.handcrossbow =
    "Compendium.ak5e.ak5e-items.Item.LqVtxMaqJotYLr9a";
	CONFIG.DND5E.weaponIds.handgun =
    "Compendium.ak5e.ak5e-items.Item.GUk1cU5RDuYL3OOj";
	CONFIG.DND5E.weaponIds.nailgun =
    "Compendium.ak5e.ak5e-items.Item.jjpPLGFHOZsiWFBA";
	CONFIG.DND5E.weaponIds.throwingdisc =
    "Compendium.ak5e.ak5e-items.Item.EIPiQurk25Of8x3e";
	CONFIG.DND5E.weaponIds.greatbow =
    "Compendium.ak5e.ak5e-items.Item.z109grp29YIkpXSu";
	CONFIG.DND5E.weaponIds.heavycrossbow =
    "Compendium.ak5e.ak5e-items.Item.866oxgC2YP2qYU9g";
	CONFIG.DND5E.weaponIds.heavythrowingdisc =
    "Compendium.ak5e.ak5e-items.Item.Dhmp8MJX2KGACQh7";
	CONFIG.DND5E.weaponIds.machinegun =
    "Compendium.ak5e.ak5e-items.Item.83TFCWS78pu6wFbu";
	CONFIG.DND5E.weaponIds.rifle =
    "Compendium.ak5e.ak5e-items.Item.IRMIzg2gLDqpCi2W";
	CONFIG.DND5E.weaponIds.shotgun =
    "Compendium.ak5e.ak5e-items.Item.xtQm4gHdpMpPG44x";
	CONFIG.DND5E.weaponIds.grenadelauncher =
    "Compendium.ak5e.ak5e-items.Item.opmLg0JuPqMFgZjL";
	CONFIG.DND5E.weaponIds.rocketlauncher =
    "Compendium.ak5e.ak5e-items.Item.DpzJAwVWjBo5cLEG";

// Adds AK5e Shield Types
	CONFIG.DND5E.armorTypes.lightS = "Light Shield"
	CONFIG.DND5E.armorTypes.heavyS = "Heavy Shield"
	
// Adds AK5e Shield Proficiencies
	CONFIG.DND5E.armorProficiencies.lts = "Light Shields"
	CONFIG.DND5E.armorProficiencies.hvs = "Heavy Shields"

// Maps AK5e Shield Profs
	CONFIG.DND5E.armorProficienciesMap.lightS = "lts"
	CONFIG.DND5E.armorProficienciesMap.heavyS = "hvs"

// Removes default 5e Shield Types
	delete CONFIG.DND5E.armorTypes.shield;

// Removes default 5e Weapon Profs
	delete CONFIG.DND5E.armorProficiencies.shl;	

// Adds AK5E Armour Profs
	CONFIG.DND5E.armorIds.protectiveclothing =
	"Compendium.ak5e.ak5e-items.Item.OXGwqTbLRvlNxP0Q";
	CONFIG.DND5E.armorIds.reinforcedclothing =
	"Compendium.ak5e.ak5e-items.Item.DMq5RL7e35ZveMxb";
	CONFIG.DND5E.armorIds.lightcombatgear =
	"Compendium.ak5e.ak5e-items.Item.2SCb6lJXMkjDFMif";
	CONFIG.DND5E.armorIds.vanguardarmour =
	"Compendium.ak5e.ak5e-items.Item.6UCrBjD53j1ZN3o0";
	CONFIG.DND5E.armorIds.underarmour =
	"Compendium.ak5e.ak5e-items.Item.33A3rLP3Gm4A7Nrq";
	CONFIG.DND5E.armorIds.combatgear =
	"Compendium.ak5e.ak5e-items.Item.Cec4UmE7i2g5ZJdm";
	CONFIG.DND5E.armorIds.hazardgear =
	"Compendium.ak5e.ak5e-items.Item.rJSxxqHViUccUU7U";
	CONFIG.DND5E.armorIds.heavycombatgear =
	"Compendium.ak5e.ak5e-items.Item.JzPJEurpRdpXPazc";
	CONFIG.DND5E.armorIds.metalarmour =
	"Compendium.ak5e.ak5e-items.Item.0mz0nMJ4vg2A4a2y";
	CONFIG.DND5E.armorIds.defenderarmour =
	"Compendium.ak5e.ak5e-items.Item.CUj8KxuNMez6OMnx";
	CONFIG.DND5E.armorIds.heavydefenderarmour =
	"Compendium.ak5e.ak5e-items.Item.6CF9wwRiN7htPJSZ";
	CONFIG.DND5E.armorIds.juggernautarmour =
	"Compendium.ak5e.ak5e-items.Item.tnskKCY7wCAlcdmm";
	
// Add AK5e Shield IDs
	CONFIG.DND5E.shieldIds.smallshield =
    "Compendium.ak5e.ak5e-items.Item.ajnr0G1r5uS2J8BP";
	CONFIG.DND5E.shieldIds.combatshield =
    "Compendium.ak5e.ak5e-items.Item.DSudvLQbkLWPs6g8";
	CONFIG.DND5E.shieldIds.defendershield =
    "Compendium.ak5e.ak5e-items.Item.bJUFFpHXtrz7hE7v";
	CONFIG.DND5E.shieldIds.heavydefendershield =
    "Compendium.ak5e.ak5e-items.Item.iGFDmAEKvPmXAmkp";

// Removes default 5e Shield Profs
	delete CONFIG.DND5E.armorProficiencies.shl;


// Removes default 5e Armour

	delete CONFIG.DND5E.armorIds.breastplate;
	delete CONFIG.DND5E.armorIds.chainmail;
	delete CONFIG.DND5E.armorIds.chainshirt;
	delete CONFIG.DND5E.armorIds.halfplate;
	delete CONFIG.DND5E.armorIds.hide;
	delete CONFIG.DND5E.armorIds.leather;
	delete CONFIG.DND5E.armorIds.padded;
	delete CONFIG.DND5E.armorIds.plate;
	delete CONFIG.DND5E.armorIds.ringmail;
	delete CONFIG.DND5E.armorIds.scalemail;
	delete CONFIG.DND5E.armorIds.splint;
	delete CONFIG.DND5E.armorIds.studded;
	delete CONFIG.DND5E.shieldIds.shield;

// Adds new Toolkit Category

	CONFIG.DND5E.toolTypes.toolkit = "Tool Kit"
	
// Adds Toolkits as a Proficiency Category

	CONFIG.DND5E.toolProficiencies.toolkit = "Tool Kit"

// Adds Toolkit Profs

	CONFIG.DND5E.tools.art = {
    ability: "wis",
    id: "Compendium.ak5e.ak5e-items.Item.uJv6rhzPijvjHznJ"
	};
	CONFIG.DND5E.tools.brewing = {
    ability: "wis",
    id: "Compendium.ak5e.ak5e-items.Item.Ildgv7odyqeahxmy"
	};
	CONFIG.DND5E.tools.cooking = {
    ability: "wis",
    id: "Compendium.ak5e.ak5e-items.Item.cx7nNrpfLvAHIfmq"
	};
	CONFIG.DND5E.tools.engineering = {
    ability: "int",
    id: "Compendium.ak5e.ak5e-items.Item.XfS9C2RHzrrMdlip"
	};
	CONFIG.DND5E.tools.instrumentbagpipes = {
    ability: "cha",
    id: "Compendium.ak5e.ak5e-items.Item.ZuHZkt1h2YP8lgwu"
	};
	CONFIG.DND5E.tools.instrumentbass = {
    ability: "cha",
    id: "Compendium.ak5e.ak5e-items.Item.SCHjE2T5gXZRtIpX"
	};
	CONFIG.DND5E.tools.instrumentcello = {
    ability: "cha",
    id: "Compendium.ak5e.ak5e-items.Item.96vApcsV1yyaPTyD"
	};
	CONFIG.DND5E.tools.instrumentdrums = {
    ability: "cha",
    id: "Compendium.ak5e.ak5e-items.Item.QvzlfvutcIIezpDs"
	};
	CONFIG.DND5E.tools.instrumentflute = {
    ability: "cha",
    id: "Compendium.ak5e.ak5e-items.Item.gFr3mcd57Og1c0pZ"
	};
	CONFIG.DND5E.tools.instrumentguitar = {
    ability: "cha",
    id: "Compendium.ak5e.ak5e-items.Item.Hs0mF5dzKXUqdAdP"
	};
	CONFIG.DND5E.tools.instrumentharp = {
    ability: "cha",
    id: "Compendium.ak5e.ak5e-items.Item.5l64laM4rk4Ivi0m"
	};
	CONFIG.DND5E.tools.instrumentkeyboard = {
    ability: "cha",
    id: "Compendium.ak5e.ak5e-items.Item.YAl6BnAF78PaYlDX"
	};
	CONFIG.DND5E.tools.instrumentmicrophone = {
    ability: "cha",
    id: "Compendium.ak5e.ak5e-items.Item.dqXsCaK1P0JhtYC4"
	};
	CONFIG.DND5E.tools.instrumenttrombone = {
    ability: "cha",
    id: "Compendium.ak5e.ak5e-items.Item.Nng70cKI1btONIpk"
	};
	CONFIG.DND5E.tools.instrumenttuba = {
    ability: "cha",
    id: "Compendium.ak5e.ak5e-items.Item.8kQVIEXNMpMwu0XE"
	};
	CONFIG.DND5E.tools.instrumentturntable = {
    ability: "cha",
    id: "Compendium.ak5e.ak5e-items.Item.tDJPOjB3go7yh1at"
	};
	CONFIG.DND5E.tools.instrumentviolin = {
    ability: "cha",
    id: "Compendium.ak5e.ak5e-items.Item.YRaUmzhRyxMbjH3U"
	};
	CONFIG.DND5E.tools.instrumentother = {
    ability: "cha",
    id: "Compendium.ak5e.ak5e-items.Item.sIWoR9fKRrec9UfW"
	};
	CONFIG.DND5E.tools.maintenance = {
    ability: "str",
    id: "Compendium.ak5e.ak5e-items.Item.LL42rU6BBic45HZv"
	};
	CONFIG.DND5E.tools.makeover = {
    ability: "int",
    id: "Compendium.ak5e.ak5e-items.Item.0ft9PxeRW8FoUjgb"
	};
	CONFIG.DND5E.tools.mechanism = {
    ability: "dex",
    id: "Compendium.ak5e.ak5e-items.Item.IIulvylBDhw2Zz4F"
	};
	CONFIG.DND5E.tools.medical = {
    ability: "int",
    id: "Compendium.ak5e.ak5e-items.Item.JAmRuAi1wbg4Zwdm"
	};
	CONFIG.DND5E.tools.messenger = {
    ability: "int",
    id: "Compendium.ak5e.ak5e-items.Item.wqd3yeo5ea2DAqD9"
	};
	CONFIG.DND5E.tools.pharmacology = {
    ability: "int",
    id: "Compendium.ak5e.ak5e-items.Item.YWNh0sRApVhTseeC"
	};
	CONFIG.DND5E.tools.tailoring = {
    ability: "dex",
    id: "Compendium.ak5e.ak5e-items.Item.yUbrNv1GkAtDTujE"
	};
	CONFIG.DND5E.tools.woodwork = {
    ability: "str",
    id: "Compendium.ak5e.ak5e-items.Item.2MfZHPX5xtOxH4Zr"
	};

// Add Drone Vehicle Type

	CONFIG.DND5E.vehicleTypes.drone = "ak5e.VEHICLE.Type.Drone.label"
	
// Adds LMD Currency	
	
	CONFIG.DND5E.currencies = {
    credits: {
      label: "ak5e.currencies.currency",
      abbreviation: "LMD",
      conversion: 1,
    },
	};

// Adds Class Feature Types

	CONFIG.DND5E.featureTypes.class.subtypes.artsPoints = "Arts Points"
	CONFIG.DND5E.featureTypes.class.subtypes.skillPoints = "Skill Points"
	CONFIG.DND5E.featureTypes.class.subtypes.skillPoints = "Talent"
	
// Replaces Unused Skills

	CONFIG.DND5E.skills.arc = {
		label: "ak5e.skills.skillArts",
		ability: "int",
		fullKey: "arts",
		icon: "",
	};

	CONFIG.DND5E.skills.rel = {
		label: "ak5e.skills.skillLore",
		ability: "int",
		fullKey: "lore",
		icon: "",
	};
	
	CONFIG.DND5E.skills.nat = {
		label: "ak5e.skills.skillWilderness",
		ability: "wis",
		fullKey: "wilderness",
		icon: "",
	};
	
// Removes Unused Skills

	delete CONFIG.DND5E.skills.sur
	delete CONFIG.DND5E.skills.his
	
// Adds Tech Skill	

	CONFIG.DND5E.skills.tech = {
		label: "ak5e.skills.skillTechnology",
		ability: "int",
		fullKey: "technology",
		icon: "",
	};
	
// Add ak5e Conditions


	CONFIG.DND5E.conditionTypes.bleeding = {
	  name: "ak5e.conditionTypes.condTypeBleed",
      img: "systems/dnd5e/icons/svg/statuses/bleeding.svg",
	  reference: "Compendium.ak5e.ak5e-rules.JournalEntry.yrw3CUXpJvV19NKU.JournalEntryPage.CwF1796PusuYK4aS",
    };
	CONFIG.DND5E.conditionTypes.burning = {
      name: "ak5e.conditionTypes.condTypeBurn",
	  img: "systems/dnd5e/icons/svg/statuses/burning.svg",
	  reference: "Compendium.ak5e.ak5e-rules.JournalEntry.yrw3CUXpJvV19NKU.JournalEntryPage.QvfVcC6EfK8BcV1u",
    };
	CONFIG.DND5E.conditionTypes.corroded = {
      name: "ak5e.conditionTypes.condTypeCorro",
	  img: "systems/dnd5e/icons/svg/damage/acid.svg",
	  reference: "Compendium.ak5e.ak5e-rules.JournalEntry.yrw3CUXpJvV19NKU.JournalEntryPage.jx1bNgvD67Kbm5i9",
    };
	CONFIG.DND5E.conditionTypes.dazed = {
	  name: "ak5e.conditionTypes.condTypeDazed",
      img: "systems/dnd5e/icons/svg/statuses/sleeping.svg",
	  reference: "Compendium.ak5e.ak5e-rules.JournalEntry.yrw3CUXpJvV19NKU.JournalEntryPage.I9d3BTGGvqQ1NK6z",
    };
	CONFIG.DND5E.conditionTypes.frozen = {
      name: "ak5e.conditionTypes.condTypeFrozen",
	  img: "systems/dnd5e/icons/svg/damage/cold.svg",
	  reference: "Compendium.ak5e.ak5e-rules.JournalEntry.yrw3CUXpJvV19NKU.JournalEntryPage.yW3n8jEY8GZqvt8A",
    };
	CONFIG.DND5E.conditionTypes.necrotised = {
      name: "ak5e.conditionTypes.condTypeNecro",
	  img: "systems/dnd5e/icons/svg/statuses/diseased.svg",
	  reference: "Compendium.ak5e.ak5e-rules.JournalEntry.yrw3CUXpJvV19NKU.JournalEntryPage.VpoEdERvRcEK7jiW",
    };
	CONFIG.DND5E.conditionTypes.nervousimpairment = {
      name: "ak5e.conditionTypes.condTypeNerve",
	  img: "systems/dnd5e/icons/svg/damage/necrotic.svg",
	  reference: "Compendium.ak5e.ak5e-rules.JournalEntry.yrw3CUXpJvV19NKU.JournalEntryPage.ydKqJFnponQGLdWq",
    };
	CONFIG.DND5E.conditionTypes.silenced = {
      name: "ak5e.conditionTypes.condTypeSilen",
	  img: "systems/dnd5e/icons/svg/statuses/silenced.svg",
	  reference: "Compendium.ak5e.ak5e-rules.JournalEntry.yrw3CUXpJvV19NKU.JournalEntryPage.oda5UOSUJg7n9DQL",
    };

	// Adds AK5e Standard Langs

	CONFIG.DND5E.languages.standard.children.aegirian = "ak5e.Language.Aegirian"
	CONFIG.DND5E.languages.standard.children.durinese = "ak5e.Language.Durinese"
	CONFIG.DND5E.languages.standard.children.higashinese = "ak5e.Language.Higashinese"
	CONFIG.DND5E.languages.standard.children.iberian = "ak5e.Language.Iberian"
	CONFIG.DND5E.languages.standard.children.kazimierzian = "ak5e.Language.Kazimierzian"
	CONFIG.DND5E.languages.standard.children.kjeragian = "ak5e.Language.Kjeragian"
	CONFIG.DND5E.languages.standard.children.lateran = "ak5e.Language.Lateran"
	CONFIG.DND5E.languages.standard.children.leithanian = "ak5e.Language.Leithanian"
	CONFIG.DND5E.languages.standard.children.samifjod = "ak5e.Language.Samifjod"
	CONFIG.DND5E.languages.standard.children.sargonic = "ak5e.Language.Sargonic"
	CONFIG.DND5E.languages.standard.children.sarkazian = "ak5e.Language.Sarkazian"
	CONFIG.DND5E.languages.standard.children.siracusan = "ak5e.Language.Siracusan"
	CONFIG.DND5E.languages.standard.children.ursine = "ak5e.Language.Ursine"
	CONFIG.DND5E.languages.standard.children.victorian = "ak5e.Language.Victorian"
	CONFIG.DND5E.languages.standard.children.yanese = "ak5e.Language.Yanese"

	// Adds AK5e Standard Langs

	CONFIG.DND5E.languages.exotic.children.gaulish = "ak5e.Language.Gaulish"
	CONFIG.DND5E.languages.exotic.children.sign = "ak5e.Language.SignLanguage"

	// Delete standard 5e languages
	
	delete CONFIG.DND5E.languages.standard.children.common;
	delete CONFIG.DND5E.languages.standard.children.draconic;
	delete CONFIG.DND5E.languages.standard.children.dwarvish;
	delete CONFIG.DND5E.languages.standard.children.elvish;
	delete CONFIG.DND5E.languages.standard.children.giant;
	delete CONFIG.DND5E.languages.standard.children.gnomish;
	delete CONFIG.DND5E.languages.standard.children.goblin;
	delete CONFIG.DND5E.languages.standard.children.halfling;
	delete CONFIG.DND5E.languages.standard.children.orc;
	delete CONFIG.DND5E.languages.standard.children.sign;

	// Delete exotic 5e languages

	delete CONFIG.DND5E.languages.exotic.children.aarakocra;
    delete CONFIG.DND5E.languages.exotic.children.abyssal;
    delete CONFIG.DND5E.languages.exotic.children.cant;
    delete CONFIG.DND5E.languages.exotic.children.celestial;
    delete CONFIG.DND5E.languages.exotic.children.deep;
    delete CONFIG.DND5E.languages.exotic.children.druidic;
    delete CONFIG.DND5E.languages.exotic.children.gith;
    delete CONFIG.DND5E.languages.exotic.children.gnoll;
    delete CONFIG.DND5E.languages.exotic.children.infernal;
    delete CONFIG.DND5E.languages.exotic.children.primordial;
    delete CONFIG.DND5E.languages.exotic.children.sylvan;
    delete CONFIG.DND5E.languages.exotic.children.undercommon;

	// Register Character Sheet
	registerCharacterSheet();

	// Add Nationality Item Type
	for (const advType of ['ItemChoice', 'ItemGrant', 'ScaleValue', 'Trait']) {
    	CONFIG.DND5E.advancementTypes[advType].validItemTypes.add(
        	'ak5e.nationality'
    	);
	}

    Object.assign(CONFIG.Item.dataModels, {
        "ak5e.nationality": NationalityData
  	});

	addTabs();

	CONFIG.DND5E.defaultArtwork.Item["ak5e.nationality"] = "modules/ak5e/icons/nationality/nationality.svg";

});

async function AddNationalityBar(sheet, html, { editable, ...context }) {
  /**
   * Nationality
   */

  const parser = new DOMParser();
  const originInfo = html.childNodes[3].childNodes[1].childNodes[0].childNodes[1].childNodes[0].childNodes[3].childNodes[1].childNodes[3];
  const actor = sheet.actor;
  const itemTypes = actor.itemTypes;
  const nationality = itemTypes['ak5e.nationality'][0];
  const nationalityPill = await foundry.applications.handlebars.renderTemplate(
    'modules/ak5e/templates/actors/nationality-insert.hbs',
    {
      actor,
      item: nationality,
      type: 'ak5e.nationality',
      editable
    }
  );
  originInfo.replaceChild(parser.parseFromString(nationalityPill, 'text/html').body.childNodes[0], originInfo.childNodes[5]);
}

Hooks.on("preCreateActiveEffect", (effect) => {
  if (effect._id !== "dnd5efrozen00000") return;
  effect.updateSource({changes: [{ key: "system.attributes.movement.all", value: -20, mode: 6 }]});
});

Hooks.on("preCreateActiveEffect", (effect) => {
  if (effect._id !== "dnd5ecorroded000") return;
  effect.updateSource({changes: [{ key: "system.attributes.ac.bonus", value: -2, mode: 2 }]});
});

Hooks.on("preCreateActiveEffect", (effect) => {
  if (effect._id !== "dnd5enecrotised0") return;
effect.updateSource({changes: [{ key: "system.bonuses.spell.dc", value: -3, mode: 2 }, 
{ key: "system.abilities.str.dc", value: -3, mode: 2 },
{ key: "system.abilities.dex.dc", value: -3, mode: 2 },
{ key: "system.abilities.con.dc", value: -3, mode: 2 },
{ key: "system.abilities.int.dc", value: -3, mode: 2 },
{ key: "system.abilities.wis.dc", value: -3, mode: 2 },
{ key: "system.abilities.cha.dc", value: -3, mode: 2 },
{ key: "system.bonuses.All-Damage", value: -3, mode: 6 }
]}); 
});

Hooks.on("preCreateActiveEffect", (effect) => {
  if (effect._id !== "dnd5edazed000000") return;
  effect.updateSource({changes: [{ key: "system.bonuses.abilities.save", value: "-1d4", mode: 2 },{ key: "system.bonuses.All-Attacks", value: "-1d4", mode: 2 }]});
});

// Tracking Bars

import { TrackingBars } from "./TrackingBars.js";

export const TRACKING_BARS_DEFAULT = {
  barFirstColor: "#4361EE",
  barSecondColor: "#4cc9f0",
  animations: {
    'scroll': 'Scroll',
    'img-energy': 'ak5e.energyAnimation',
    'img-energy-h': 'ak5e.energyHAnimation',
    'img-bubbles': 'ak5e.bubblesAnimation',
    'img-star': 'ak5e.starAnimation',
  },
  animation: 'none',
  animate: false
}

Hooks.once("i18nInit", () => {
  // Localise the default animations after i18n is initialised
  TRACKING_BARS_DEFAULT.animations = Object.fromEntries(
    Object.entries(TRACKING_BARS_DEFAULT.animations).map(([key, label]) => [key, game.i18n.localize(label)])
  );
});

// Register the TrackingBars class to handle item resource rendering and updates
Hooks.on("renderItemSheet5e", async (app, html, data) => {
  TrackingBars.renderItemResourceOptions(app, html, data);
})

Hooks.on("renderActorSheetV2", (app, html, data) => {
  TrackingBars.alterCharacterSheet(app, html, data);
  AddNationalityBar(app, html, context);
});

Hooks.on("updateItem", TrackingBars.updateTrackingBars);
Hooks.on("createItem", TrackingBars.createTrackingBars);
Hooks.on("preDeleteItem", TrackingBars.preDeleteTrackingBars);
Hooks.on("preUpdateItem", TrackingBars.preUpdateTrackingBars);

