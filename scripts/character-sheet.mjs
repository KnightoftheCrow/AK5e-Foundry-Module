/**
 * Register the ak5e character sheet.
 */
export function registerCharacterSheet() {
  //foundry.applications.apps.DocumentSheetConfig.unregisterSheet(Actor, "dnd5e", dnd5e.applications.actor.CharacterActorSheet);
  foundry.applications.apps.DocumentSheetConfig.registerSheet(Actor, "dnd5e", AK5eCharacterActorSheet, {
    types: ["character"],
    makeDefault: true,
    label: "ak5e.sheet.characterSheet"
  });
}

/* -------------------------------------------- */

/**
 * Class representing the custom character sheet.
 */
export class AK5eCharacterActorSheet extends dnd5e.applications.actor.CharacterActorSheet {
  static DEFAULT_OPTIONS = {
    ...dnd5e.applications.actor.CharacterActorSheet.DEFAULT_OPTIONS,
    classes: ["ak5e"]
  };
  
  /* -------------------------------------------- */

  static PARTS = {
    header: {
      template: "systems/dnd5e/templates/actors/character-header.hbs"
    },
    sidebar: {
      container: { classes: ["main-content"], id: "main" },
      template: "systems/dnd5e/templates/actors/character-sidebar.hbs"
    },
    details: {
      classes: ["col-2"],
      container: { classes: ["tab-body"], id: "tabs" },
      template: "modules/ak5e/templates/actors/character-details.hbs",
      scrollable: [""]
    },
    inventory: {
      container: { classes: ["tab-body"], id: "tabs" },
      template: "systems/dnd5e/templates/actors/tabs/character-inventory.hbs",
      templates: [
        "systems/dnd5e/templates/inventory/inventory.hbs", "systems/dnd5e/templates/inventory/activity.hbs",
        "systems/dnd5e/templates/inventory/encumbrance.hbs", "systems/dnd5e/templates/inventory/containers.hbs"
      ],
      scrollable: [""]
    },
    features: {
      container: { classes: ["tab-body"], id: "tabs" },
      template: "systems/dnd5e/templates/actors/tabs/character-features.hbs",
      templates: ["systems/dnd5e/templates/inventory/inventory.hbs", "systems/dnd5e/templates/inventory/activity.hbs"],
      scrollable: [""]
    },
    spells: {
      container: { classes: ["tab-body"], id: "tabs" },
      template: "systems/dnd5e/templates/actors/tabs/creature-spells.hbs",
      templates: ["systems/dnd5e/templates/inventory/inventory.hbs", "systems/dnd5e/templates/inventory/activity.hbs"],
      scrollable: [""]
    },
    effects: {
      container: { classes: ["tab-body"], id: "tabs" },
      template: "systems/dnd5e/templates/actors/tabs/actor-effects.hbs",
      scrollable: [""]
    },
    biography: {
      container: { classes: ["tab-body"], id: "tabs" },
      template: "systems/dnd5e/templates/actors/tabs/character-biography.hbs",
      scrollable: [""]
    },
    bastion: {
      container: { classes: ["tab-body"], id: "tabs" },
      template: "systems/dnd5e/templates/actors/tabs/character-bastion.hbs",
      scrollable: [""]
    },
    specialTraits: {
      classes: ["flexcol"],
      container: { classes: ["tab-body"], id: "tabs" },
      template: "systems/dnd5e/templates/actors/tabs/creature-special-traits.hbs",
      scrollable: [""]
    },
    abilityScores: {
      template: "systems/dnd5e/templates/actors/character-ability-scores.hbs"
    },
    warnings: {
      template: "systems/dnd5e/templates/actors/parts/actor-warnings-dialog.hbs"
    },
    tabs: {
      id: "tabs",
      classes: ["tabs-right"],
      template: "systems/dnd5e/templates/shared/sidebar-tabs.hbs"
    }
  };

  async _preparePartContext(partId, context, options) {
    context = await super._preparePartContext(partId, context, options);
    if ( partId === "details" ) {
      return this._prepareDetailsContext(context, options);
    }
    return context;
  }

  /* -------------------------------------------- */

  async _prepareDetailsContext(context, options) {

    context = await super._prepareDetailsContext(context, options);
    
    return context;
  }
}