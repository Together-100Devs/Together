import { MdGroupAdd } from "react-icons/md";
import { IoChatbubblesOutline } from "react-icons/io5";
import { BsCalendarPlusFill } from "react-icons/bs";
import { FaHome, FaQuestion } from "react-icons/fa";
import { RiArrowLeftCircleFill, RiArrowRightCircleFill } from "react-icons/ri";

import HeaderButton from "./HeaderButton";

const ICONS = {
  add: MdGroupAdd,
  "chat-bubble": IoChatbubblesOutline,
  calendar: BsCalendarPlusFill,
  home: FaHome,
  question: FaQuestion,
  "arrow-left": RiArrowLeftCircleFill,
  "arrow-right": RiArrowRightCircleFill,
};

export default {
  title: "CalendarHeader/HeaderButton",
  component: HeaderButton,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    tooltipText: {
      control: "text",
      description: "Tooltip text",
    },
    Icon: {
      control: "radio",
      description: "Icon to display",
      options: Object.keys(ICONS),
      mapping: ICONS,
    },
  },
};

export const Default = {
  args: {
    Icon: ICONS.calendar,
    tooltipText: "Add Event",
  },
};
