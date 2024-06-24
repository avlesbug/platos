"use client";

import { LucideUser, LogOut } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useAuth } from "../_util/authContext";

interface Props {
  showLogginButton?: boolean;
}

export const ModularHeader = ({ showLogginButton }: Props) => {
  const { user, signOut } = useAuth();

  return (
    <div className="app-header">
      <div className="header-title">
        <Link href={"/myrecipes"}>
          <span className="full-text">
            <h4>ReciPie</h4>
          </span>
          <span className="short-text">
            <h1>R</h1>
          </span>
        </Link>
      </div>
      <div className="header-buttonrow">
        {user && (
          <>
            <Link href="/myrecipes">Mine oppskrifter</Link>
            <Link href="/newrecipe">Ny oppskrift</Link>
          </>
        )}
      </div>
      {showLogginButton && (
        <div className="login-link">
          <Link href={"/login"}>Logg inn</Link>
        </div>
      )}
      {user && (
        <div className="acount-links">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <LucideUser className="h-6 w-6 text-white" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem>
                <LucideUser className="mr-2 h-4 w-4" />
                <span>Min konto</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={signOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logg ut</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
};
