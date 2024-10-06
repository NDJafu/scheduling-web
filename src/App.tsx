import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import NotesPage from "./pages/Notes.page";
import { ThemeProvider } from "./components/theme-provider";
import SignInPage from "./pages/auth/SignIn.page";
import SignUpPage from "./pages/auth/SignUp.page";
import RootLayout from "./layouts/RootLayout";
import ReminderPage from "./pages/Reminder.page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <NotesPage />,
          },
          {
            path: "/reminders",
            element: <ReminderPage />,
          },
        ],
      },
      {
        path: "/sign-in/*",
        element: <SignInPage />,
      },
      {
        path: "/sign-up/*",
        element: <SignUpPage />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="app-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
