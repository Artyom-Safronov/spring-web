import { Admin } from "react-admin";
import {
  amplicodeDarkTheme,
  amplicodeLightTheme,
} from "./themes/amplicodeTheme/amplicodeTheme";
import { dataProvider } from "./dataProvider";
import { CustomLayout } from "./layout/CustomLayout";
import { CustomRoutes } from "react-admin";
import { Route } from "react-router-dom";
import { Blank } from "./resources/Blank";
import {
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin"; 

export const App = () => {
  return (
    <Admin
      dataProvider={dataProvider}
      lightTheme={amplicodeLightTheme}
      darkTheme={amplicodeDarkTheme}
      layout={CustomLayout}
    >
      <CustomRoutes>
        <Route path="/blank" element={<Blank />} />
      </CustomRoutes>
    
      <Resource
        name="owners"
        edit={EditGuesser}
        list={ListGuesser}
        show={ShowGuesser}
        recordRepresentation="firstName"
      />
      </Admin>
  );
};
