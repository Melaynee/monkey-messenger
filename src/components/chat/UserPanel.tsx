import AvatarComponent from "../Avatar";
import UserItem from "../UserItem";
import ChatDropdownMenu from "./ChatDropdownMenu";

interface Props {}

const UserPanel = async (props: Props) => {
  return (
    <div className="w-full flex justify-between items-center px-2 md:px-4 lg:px-6 py-2 bg-main h-16 rounded-b-sm">
      <div className="flex gap-2">
        <AvatarComponent />
        <UserItem isOnPanel />
      </div>
      <div className="flex">
        <div className="">
          <ChatDropdownMenu />
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
