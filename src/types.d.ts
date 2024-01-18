/**
 * The name of the userstyle(s).
 */
export type Name = string | string[];
/**
 * The category that fits the port the most.
 */
export type Category =
  | "browser"
  | "browser_extension"
  | "cli"
  | "code_editor"
  | "development"
  | "game"
  | "leisure"
  | "library"
  | "messaging"
  | "note_taking"
  | "productivity"
  | "search_engine"
  | "social"
  | "system"
  | "terminal";
/**
 * The fill color for the string on the Catppuccin website.
 */
export type Color =
  | "rosewater"
  | "flamingo"
  | "pink"
  | "mauve"
  | "red"
  | "maroon"
  | "peach"
  | "yellow"
  | "green"
  | "teal"
  | "sky"
  | "sapphire"
  | "blue"
  | "lavender"
  | "text";
/**
 * The hyperlink of the app that is being themed.
 */
export type ApplicationLink = [string, string, ...string[]] | string;
/**
 * The FAQ section of the userstyle README.
 */
export type FAQ = [
  {
    question: string;
    answer: string;
    [k: string]: unknown;
  },
  ...{
    question: string;
    answer: string;
    [k: string]: unknown;
  }[],
];
/**
 * List of all active maintainers for this userstyle.
 */
export type Maintainer = {
  name?: string;
  url: string;
  [k: string]: unknown;
};

export type Maintainers = [Maintainer, ...Maintainer[]];

export interface UserStylesSchema {
  userstyles: Userstyles;
  collaborators: Maintainers;
}
/**
 * All userstyles in the Catppuccin org.
 */
export type Userstyles = Record<string, Userstyle>;
/**
 * The directory of the userstyle.
 *
 * This interface was referenced by `Userstyles`'s JSON-Schema definition
 * via the `patternProperty` "[A-Za-z0-9_\-]".
 */
export interface Userstyle {
  name: Name;
  category: Category;
  color?: Color;
  icon?: string;
  readme: README;
}
/**
 * Options to help in the auto-generation of the userstyle README.
 */
export interface README {
  "app-link": ApplicationLink;
  usage?: string;
  faq?: FAQ;
  "current-maintainers": Maintainers;
  "past-maintainers"?: Maintainers;
  [k: string]: unknown;
}
