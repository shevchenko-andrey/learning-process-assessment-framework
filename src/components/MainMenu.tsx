import { useAuth } from "hooks/useAuth";
import { Link } from "react-router-dom";
import { ApplicationRole } from "types/Auth";
import MenuItem from "./MenuItem";
import ProtectedContent from "./ProtectedContent";

interface MainMenuProps {
  onClose: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onClose }) => {
  const { logout } = useAuth();

  const handleClickMenuItem = () => {
    onClose();
  };

  return (
    <>
      <MenuItem>
        <Link onClick={handleClickMenuItem} to={"/"}>
          Home
        </Link>
      </MenuItem>

      <ProtectedContent roles={[ApplicationRole.ADMIN]}>
        <MenuItem>
          <Link onClick={handleClickMenuItem} to='/users'>
            Users
          </Link>
        </MenuItem>
      </ProtectedContent>

      <ProtectedContent
        roles={[ApplicationRole.TEACHER, ApplicationRole.ADMIN]}
      >
        <MenuItem>
          <Link onClick={handleClickMenuItem} to='/teacher/tests'>
            Tests
          </Link>
        </MenuItem>
      </ProtectedContent>
      <MenuItem>
        <Link onClick={handleClickMenuItem} to='/groups'>
          Groups
        </Link>
      </MenuItem>

      <MenuItem>
        <button
          onClick={() => {
            logout();
            handleClickMenuItem();
          }}
        >
          Logout
        </button>
      </MenuItem>
    </>
  );
};

export default MainMenu;
