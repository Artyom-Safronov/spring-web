import { Menu } from "react-admin";
import { Label } from "@mui/icons-material";

export const MainMenu = () => {
  return (
    <Menu>
      <Menu.DashboardItem />
      <Menu.ResourceItems />
      <Menu.Item to="/blank" primaryText="Blank" leftIcon={<Label />} />
    </Menu>
  );
};
