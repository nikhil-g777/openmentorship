const twitterPattern =
  /^(https?:\/\/)?(www\.)?twitter\.com\/(?!.*(?:admin|twitter))[A-Za-z0-9_]{1,15}(?!.*(?:admin|twitter))$/i;
const mediumPattern =
  /^(https?:\/\/)?(www\.)?medium\.com\/@([A-Za-z0-9_]+)(\/)?$/i;
const behancePattern =
  /^(https?:\/\/)?(www\.)?behance\.net\/(?!.*(projects|collections|following|appreciations|followers))(?!.*\/$)([A-Za-z0-9_]+)\/?$/i;
const githubPattern =
  /^(https?:\/\/)?(www\.)?github\.com\/([A-Za-z0-9_]+)\/?$/i;
const otherPattern =
  /^(https?:\/\/)?(www\.)?([A-Za-z0-9_]+)\.([A-Za-z0-9_]+)\/?$/i;

export {
  twitterPattern,
  mediumPattern,
  behancePattern,
  githubPattern,
  otherPattern,
};
