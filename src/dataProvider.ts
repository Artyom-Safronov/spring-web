import { DataProvider } from "react-admin";
import springDataProvider from "./springDataProvider";

const dataProviderUrl =
  process.env.MOCK_DATA === "true"
    ? import.meta.env.VITE_MOCK_URL
    : import.meta.env.VITE_REST_URL;

const baseDataProvider = springDataProvider(dataProviderUrl);

export interface CustomDataProvider extends DataProvider {}

export const dataProvider: CustomDataProvider = {
  ...baseDataProvider,
};
