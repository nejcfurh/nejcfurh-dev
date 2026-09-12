import { ButtonNameType } from '@/app/analytics/constants';

// Nav sections are data-driven, so each id needs a button name of its own.
export const NAVBAR_BUTTON_NAME_BY_SECTION: Record<string, ButtonNameType> = {
  about: ButtonNameType.NAVBAR_ABOUT,
  experience: ButtonNameType.NAVBAR_EXPERIENCE,
  projects: ButtonNameType.NAVBAR_PROJECTS,
  contact: ButtonNameType.NAVBAR_CONTACT,
};

export const MOBILE_MENU_BUTTON_NAME_BY_SECTION: Record<string, ButtonNameType> =
  {
    about: ButtonNameType.MOBILE_MENU_ABOUT,
    experience: ButtonNameType.MOBILE_MENU_EXPERIENCE,
    projects: ButtonNameType.MOBILE_MENU_PROJECTS,
    contact: ButtonNameType.MOBILE_MENU_CONTACT,
  };
