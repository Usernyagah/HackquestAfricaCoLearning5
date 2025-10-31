import { NavLink } from "react-router-dom";
import { Home, Book, Network, Code2, X, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { path: "/", icon: Home, label: "Dashboard" },
  { path: "/solidity-notes", icon: Code2, label: "Solidity Notes" },
  { path: "/ethereum-notes", icon: Network, label: "Ethereum Notes" },
  { path: "/contract-interaction", icon: Book, label: "Contract Interaction" },
  { path: "/student-registry", icon: Users, label: "Student Registry" },
];

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const sidebarContent = (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-6 lg:hidden">
        <h2 className="text-lg font-semibold">Menu</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => {
              if (window.innerWidth < 1024) onClose();
            }}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-primary text-primary-foreground glow-primary"
                  : "hover:bg-sidebar-accent text-sidebar-foreground"
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-6 border-t border-sidebar-border">
        <p className="text-xs text-sidebar-foreground/60 text-center">
          Built by Dennis Nyagah<br />
          HQ Africa Co-Learning Camp 5
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        className="hidden lg:block w-64 glass-card h-screen sticky top-0"
        initial={{ x: -264 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {sidebarContent}
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            <motion.aside
              className="fixed left-0 top-0 bottom-0 w-64 glass-card z-50 lg:hidden"
              initial={{ x: -264 }}
              animate={{ x: 0 }}
              exit={{ x: -264 }}
              transition={{ duration: 0.3 }}
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
