import { SearchIcon } from "@heroicons/react/outline";
import { DotsHorizontalIcon, VideoCameraIcon } from "@heroicons/react/solid";
import Contact from "./Contact";

const contacts = [
  {
    name: "Larry Page",
    src: "/larry0806.jpg",
  },
  {
    name: "杜振熙",
    src: "/egger0806.jpg",
  },
  {
    name: "陳時中",
    src: "/chen0806.jpg",
  },
  {
    name: "Shawn Mendes",
    src: "/mendes0806.jpg",
  },
  {
    name: "楊德昌",
    src: "/yang0806.jpg",
  },
  {
    name: "大谷 翔平",
    src: "/Shotime0806.jpg",
  },
];

function Widget() {
  return (
    <div className="hidden lg:flex flex-col w-60 p-2 mt-5">
      <div className="flex justify-between items-center text-gray-500 mb-5">
        <h2 className="text-xl">Contacts</h2>

        <div className="flex space-x-2">
          <VideoCameraIcon className="h-6" />
          <SearchIcon className="h-6" />
          <DotsHorizontalIcon className="h-6" />
        </div>
      </div>

      {contacts.map(({ name, src }) => (
        <Contact key={src} name={name} src={src} />
      ))}
    </div>
  );
}

export default Widget;