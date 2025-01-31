import { Authenticated, Refine } from "@refinedev/core";
// import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import {
  ErrorComponent,
  notificationProvider,
  RefineThemes,
  ThemedLayoutV2,
} from "@refinedev/chakra-ui";
import { ChakraProvider } from "@chakra-ui/react";
import nestjsxCrudDataProvider from "./providers/nestjsx-crud";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { authProvider } from "./authProvider";
import { Header, Title } from "./components";
import { ForgotPassword } from "./pages/forgotPassword";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { ProjectList, ProjectCreate, ProjectEdit, ProjectShow } from "./pages/projects";
import { RoomList, RoomCreate, RoomEdit, RoomShow } from "./pages/rooms";
import {
  ProjectApiKeyList,
  ProjectApiKeyCreate,
  ProjectApiKeyEdit,
  ProjectApiKeyShow,
} from "./pages/projectapikeys";
import { API_URL } from "./api/axios";

function App() {
  const dataProvider = nestjsxCrudDataProvider(API_URL);

  const { t, i18n } = useTranslation();
  const i18nProvider = {
    // @ts-ignore
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ChakraProvider theme={RefineThemes.Purple}>
          {/* <DevtoolsProvider> */}
          <Refine
            dataProvider={dataProvider}
            notificationProvider={notificationProvider}
            routerProvider={routerBindings}
            authProvider={authProvider}
            i18nProvider={i18nProvider}
            resources={[
              {
                name: "projects",
                list: "/projects",
                create: "/projects/create",
                edit: "/projects/edit/:id",
                show: "/projects/show/:id",
                meta: {
                  canDelete: true,
                },
              },
              {
                name: "rooms",
                list: "/rooms",
                create: "/rooms/create",
                edit: "/rooms/edit/:id",
                show: "/rooms/show/:id",
                meta: {
                  canDelete: true,
                  // parent: "projects",
                },
              },
              {
                name: "project-api-keys",
                list: "/project-api-keys",
                create: "/project-api-keys/create",
                edit: "/project-api-keys/edit/:id",
                show: "/project-api-keys/show/:id",
                meta: {
                  canDelete: true,
                },
              },
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              useNewQueryKeys: true,
              projectId: "hNduwj-Hd58Ak-gfFWaT",
            }}
          >
            <Routes>
              <Route
                element={
                  <Authenticated
                    key="authenticated-inner"
                    fallback={<CatchAllNavigate to="/login" />}
                  >
                    <ThemedLayoutV2 Header={() => <Header sticky />} Title={Title}>
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route index element={<NavigateToResource resource="projects" />} />

                <Route path="/projects">
                  <Route index element={<ProjectList />} />
                  <Route path="create" element={<ProjectCreate />} />
                  <Route path="edit/:id" element={<ProjectEdit />} />
                  <Route path="show/:id" element={<ProjectShow />} />
                </Route>

                <Route path="/rooms">
                  <Route index element={<RoomList />} />
                  <Route path="create" element={<RoomCreate />} />
                  <Route path="edit/:id" element={<RoomEdit />} />
                  <Route path="show/:id" element={<RoomShow />} />
                </Route>

                <Route path="/project-api-keys">
                  <Route index element={<ProjectApiKeyList />} />
                  <Route path="create" element={<ProjectApiKeyCreate />} />
                  <Route path="edit/:id" element={<ProjectApiKeyEdit />} />
                  <Route path="show/:id" element={<ProjectApiKeyShow />} />
                </Route>

                <Route path="*" element={<ErrorComponent />} />
              </Route>
              <Route
                element={
                  <Authenticated key="authenticated-outer" fallback={<Outlet />}>
                    <NavigateToResource />
                  </Authenticated>
                }
              >
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
              </Route>
            </Routes>

            <RefineKbar />
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
          {/* <DevtoolsPanel /> */}
          {/* </DevtoolsProvider> */}
        </ChakraProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
