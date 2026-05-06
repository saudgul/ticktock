import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.jsx";
import TimesheetPage from "./pages/TimesheetPage.jsx";
import TimesheetWeek from "./pages/TimesheetWeek.jsx";
import NotFound from "./pages/NotFound.jsx";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/timesheet" element={<TimesheetPage />} />
        <Route path="/week" element={<TimesheetWeek />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;

