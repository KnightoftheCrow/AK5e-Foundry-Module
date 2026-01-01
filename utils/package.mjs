import fs from "fs";
import logger from "fancy-log";
import path from "path";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { compilePack, extractPack } from "@foundryvtt/foundryvtt-cli";

const PACK_DEST = "packs";
const PACK_SRC = "packs/_source";

yargs()
	.usage('$0 <cmd>')
	.command({
		command: 'pack',
		describe: 'package .yml source files into their compendiums',
		handler: async () => await pack()
	})
	.command({
		command: 'unpack',
		describe: 'unpack compendiums into .yml source files',
		handler: async () => await unpack()
	})
	.help()
	.parse(hideBin(process.argv));

async function pack() {
	const folders = fs.readdirSync(PACK_SRC, {withFileTypes: true});

	for (const folder of folders) {
		const src = path.join(PACK_SRC, folder.name);
		const dest = path.join(PACK_DEST, folder.name);

		logger.info(`Packaging compendium ${folder.name}`);

		await compilePack(src, dest, {recursive: true, yaml: true});
	}
}

async function unpack() {
	const module = JSON.parse(fs.readFileSync("./module.json", {encoding: "utf8"}));

	for (const packInfo of module.packs) {
		const dest = path.join(PACK_SRC, packInfo.name);

		logger.info(`Unpacking compendium ${packInfo.name}`);

		const folders = {};
		const containers = {};

		await extractPack(packInfo.path, dest, {
			transformEntry: e => {
				if (e._key.startsWith("!folders")) {
					folders[e._id] = {
						name: slugify(e.name),
						folder: e.folder
					};
				} else if (e.type === "container") {
					containers[e._id] = {
						name: slugify(e.name),
						container: e.system?.container,
						folder: e.folder
					}
				};

				return false;
			}
		});

		const buildPath = (collection, entry, parentKey) => {
			let parent = collection[entry[parentKey]];

			entry.path = entry.name;

			while (parent) {
				entry.path = path.join(parent.name, entry.path);
				parent = collection[parent[parentKey]];
			}
		};
	
		Object.values(folders).forEach(f => buildPath(folders, f, "folder"));
		Object.values(containers).forEach(c => {
			buildPath(containers, c, "container");

			const folder = folders[c.folder];

			if (folder) c.path = path.join(folder.path, c.path);
		});

		await extractPack(packInfo.path, dest, {clean: true, folders: true, yaml: true,
			transformName: entry => {
				if (entry._id in folders) return path.join(folders[entry._id].path, "_folder.yml");
				if (entry._id in containers) return path.join(containers[entry._id].path, "_container.yml");

				const outputName = slugify(entry.name);
				const parent = containers[entry.system?.container] ?? folders[entry.folder];

				return path.join(parent?.path ?? "", `${outputName}.yml`);
			}
		});
	}
}

function slugify(name) {
  return name.toLowerCase().replace("'", "").replace(/[^a-z0-9]+/gi, " ").trim().replace(/\s+|-{2,}/g, "-");
}
