import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

const links = [
  {
    id: 1,
    adminOnly: false,
    text: "results",
    path: "stats",
    icon: <IoBarChartSharp />,
  },
  {
    id: 2,
    adminOnly: false,
    text: "Practice & Tests",
    path: "/",
    icon: <MdQueryStats />,
  },
  {
    id: 3,
    adminOnly: true,
    text: "add question",
    path: "add-question",
    icon: <FaWpforms />,
  },

  {
    id: 4,
    adminOnly: false,
    text: "profile",
    path: "profile",
    icon: <ImProfile />,
  },
];

export default links;
