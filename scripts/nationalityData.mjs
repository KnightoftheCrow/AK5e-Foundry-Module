export default class NationalityData extends dnd5e.dataModels.abstract.ItemDataModel.mixin(
  dnd5e.dataModels.item.AdvancementTemplate, dnd5e.dataModels.item.ItemDescriptionTemplate, dnd5e.dataModels.item.startingEquipment.default
)  {
/* -------------------------------------------- */
  /*  Model Configuration                         */
  /* -------------------------------------------- */

  /** @override */
  static LOCALIZATION_PREFIXES = ["DND5E.SOURCE"];

  /* -------------------------------------------- */

  /** @inheritDoc */
  static metadata = Object.freeze(foundry.utils.mergeObject(super.metadata, {
    singleton: true
  }, {inplace: false}));

  /* -------------------------------------------- */
  /*  Data Preparation                            */
  /* -------------------------------------------- */

  /** @inheritDoc */
  prepareDerivedData() {
    super.prepareDerivedData();
    this.prepareDescriptionData();
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  async getSheetData(context) {
    context.subtitles = [{ label: game.i18n.localize(CONFIG.Item.typeLabels["ak5e.nationality"]) }];
    context.singleDescription = true;
    context.parts = ["dnd5e.details-background", "dnd5e.details-starting-equipment"];
  }

  /* -------------------------------------------- */
  /*  Socket Event Handlers                       */
  /* -------------------------------------------- */

  /** @override */
  _advancementToCreate(options) {
    if ( game.settings.get("dnd5e", "rulesVersion") === "legacy" ) return [
      { type: "Trait", title: game.i18n.localize("AK5E.ADVANCEMENT.Defaults.NationalityProficiencies") },
      { type: "ItemGrant", title: game.i18n.localize("AK5E.ADVANCEMENT.Defaults.NationalityFeature") }
    ];

    return [
      { type: "AbilityScoreImprovement", configuration: { points: 3 } },
      { type: "Trait", title: game.i18n.localize("AK5E.ADVANCEMENT.Defaults.NationalityProficiencies") },
      {
        type: "Trait",
        title: game.i18n.localize("DND5E.ADVANCEMENT.Defaults.ChooseLanguages"),
        configuration: { grants: ["languages:standard:common"] }
      },
      { type: "ItemGrant", title: game.i18n.localize("AK5E.ADVANCEMENT.Defaults.NationalityFeat") }
    ];
  }

  /* -------------------------------------------- */

  async _preCreate(data, options, user) {
    if ( (await super._preCreate(data, options, user)) === false ) return false;
    await this.preCreateAdvancement(data, options);
  }

  /* -------------------------------------------- */

  _onCreate(data, options, userId) {
    if (game.user.id !== userId || this.parent.actor?.type !== 'character')
      return;
    this.parent.actor.setFlag('ak5e', 'nationality', this.parent.id);
  }

  /* -------------------------------------------- */

  async _preDelete(options, user) {
    if (this.parent.actor?.type !== 'character') return;
    await this.parent.actor.unsetFlag('ak5e', 'nationality');
  }
}
