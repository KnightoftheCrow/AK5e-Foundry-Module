import { TrackingPopup } from "./TrackingPopup.js";
import { TRACKING_BARS_DEFAULT } from "./system_edits.mjs";

export function isset(variable) {
  return (typeof variable !== 'undefined');
}

export class TrackingBars {
  /**
   * Render the item resource options in the item sheet.
   * @param {ItemSheet5e} app - The item sheet application.
   * @param {HTMLElement} html - The HTML element of the item sheet.
   * @param {Object} data - The data for the item.
   */
  static async renderItemResourceOptions(app, html, data) {
    const htmlElem = html instanceof HTMLElement ? html : html[0];
    const item = data.document;
    const actor = item.actor;

    if (isset(item.system.uses) && actor) {
      const itemId = item._id;
      let template_data = item;
      template_data.flags.ak5e = item.flags?.ak5e ?? TRACKING_BARS_DEFAULT;

      let percent = item.system.uses.value / item.system.uses.max * 100 > 100 ? 100 : item.system.uses.value / item.system.uses.max * 100;
      template_data.percent = percent; 3
      template_data.animations = TRACKING_BARS_DEFAULT.animations;

      const template_file = "/modules/ak5e/templates/tracking_bar_config.hbs";
      foundry.applications.handlebars.renderTemplate(template_file, template_data).then(function (html) {
        const detailsSection = htmlElem.querySelector('section.details');
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        Array.from(tempDiv.childNodes).forEach(node => detailsSection.appendChild(node));

        // restore scroll position if it exists
        detailsSection.scrollTop = TrackingBars.scroll;
        TrackingBars.scroll = 0;
        detailsSection.addEventListener('change', function (e) {
          TrackingBars.scroll = detailsSection.scrollTop;
        });
      })
    }
  }

  static scroll = 0;

  static preUpdateTrackingBars(item, updateData, options, userId) { }
  static createTrackingBars(item, updateData, options, userId) { }

// Gets rid of flags when item is deleted 

  static async preDeleteTrackingBars(item, options, userId) {
    const actor = item.parent;
    if (!actor || !actor.flags?.ak5e) return;

    const itemId = item.id;

    if (actor.flags.ak5e.hasOwnProperty(itemId)) {
      await actor.update({
        [`flags.ak5e.-=${itemId}`]: null
      });
    }
  }

// Handles item resource updates

  static async updateTrackingBars(item, updateData, options, userId) {
    if (isset(updateData.flags?.ak5e) || isset(updateData.system?.uses)) {
      const actor = item.parent;
      if (actor) {
        if (item.flags?.ak5e?.trackingBar) {
          // If the resource bar is enabled, update the actor's flags with the resource data
          await actor.update({
            [`flags.ak5e`]: {
              [`${item._id}`]: {
                barFirstColor: item.flags.ak5e?.barFirstColor,
                barSecondColor: item.flags.ak5e?.barSecondColor,
                animation: item.flags.ak5e?.animation,
                uses: {
                  max: item.system.uses.max,
                  spent: item.system.uses.spent,
                }
              }
            }
          });
        } else {
          // remove data from actor's flags
          await actor.update({
            [`flags.ak5e.-=${item._id}`]: null
          });
        }
      }
    }
  }

  static async alterCharacterSheet(app, html, data) {
    if (isset(data.actor.flags?.ak5e)) {
      const trackingBars = data.actor.flags.ak5e;
      const resourceKeys = Object.keys(trackingBars);
      if (resourceKeys.length > 0) {
        const template_file = "modules/ak5e/templates/sheet_tracking_bar_config.hbs";
        let cleanKeys = [];

        let sidebarClasses = '.sidebar .stats'
        let append = true;

        if (app.classList.value.includes('tidy5e-sheet')) {
          // Tidy5e specific handling
          sidebarClasses = '.attributes .side-panel';
          append = false;
        }

        let tempHtml = $('<div class="tracking-bar-container"></div>');

        if ($(sidebarClasses + ' .tracking-bar-container', html).length > 0) {
          // If the resource bar container already exists, clear it
          $(sidebarClasses + ' .tracking-bar-container', html).remove();
        }
        // Create a new container for the resource bars
        if (append) {
          $(sidebarClasses, html).append(tempHtml);
        } else {
          $(sidebarClasses, html).prepend(tempHtml);
        }

        for (const key of resourceKeys) {
          if (trackingBars[key] === null) {
            continue; // Skip if the resource data is null
          }
          const Item = data.actor.items.get(key);
          if (!Item) {
            //store leftover keys.
            cleanKeys.push(trackingBars[key]);
            continue; // Skip non existing items.
          }
          const resourceData = trackingBars[key];
          const uses = Item.system.uses;
          const template_data = {
            item: Item,
            itemId: key,
            editable: data.editable,
            barFirstColor: resourceData.barFirstColor || TRACKING_BARS_DEFAULT.barFirstColor,
            barSecondColor: resourceData.barSecondColor || TRACKING_BARS_DEFAULT.barSecondColor,
            animation: resourceData.animation || TRACKING_BARS_DEFAULT.animation,
            value: uses.max - uses.spent,
            max: uses.max,
            percent: (uses.max - uses.spent) / uses.max * 100
          }
          const rendered_html = await foundry.applications.handlebars.renderTemplate(template_file, template_data);

          tempHtml.append(rendered_html);
        }

        if (append) {
          $(sidebarClasses, html).append(tempHtml);
        } else {
          $(sidebarClasses, html).prepend(tempHtml);
        }

        // remove leftovers
        if (cleanKeys.length > 0) {
          // Create an update object with all keys to be removed
          const deleteFlags = Object.fromEntries(
            cleanKeys.map(key => [`flags.ak5e.-=${key}`, null])
          );

          // Perform single update to remove all invalid keys
          await data.actor.update(deleteFlags);
        }



        $(sidebarClasses, html).on('click', '.resource-config', async (event) => {
          const itemId = event.currentTarget.dataset.id;
          let config = new TrackingPopup({ document: data.actor.items.get(itemId) });
          config?.render(true);
        })
      }
    }
  }
}