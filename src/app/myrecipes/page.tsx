"use client";

import "~/styles/globals.css";
import { RecipeCard } from "../_components/RecipeCard";
import { type Recipe } from "../_util/types";
import { useAuth } from "../_util/authContext";
import { Button } from "~/components/ui/button";
import {
  Pencil,
  PencilLine,
  ListFilter,
  ArrowDownAZ,
  ArrowUpAZ,
  ArrowDown01,
  ArrowUp01,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";

type SortType = "name" | "dateAdded";

export default function MyRecipesPage() {
  const [editState, setEditState] = useState(false);
  const [sortField, setSortField] = useState("name");
  const { recipes, loading } = useAuth();
  const [sortedRecipes, setSortedRecipes] = useState(recipes);
  const [selectedSortOption, setSelectedSortOption] = useState(0);
  const [showSearchField, setShowSearchField] = useState(false);

  useEffect(() => {
    setSortedRecipes([...recipes]);
  }, [recipes]);

  const sortByField = (newSortField: SortType, sortAscend: boolean) => {
    const resortedRecipes = [...sortedRecipes].sort((a, b) => {
      let comparison = 0;
      if (a[newSortField] > b[newSortField]) {
        comparison = 1;
      } else if (a[newSortField] < b[newSortField]) {
        comparison = -1;
      }
      return sortAscend ? comparison : -comparison;
    });
    // setSortField(newSortField);
    setSortedRecipes(resortedRecipes);
  };

  return (
    <div className="recipe-grid-container">
      <div className="recipe-grid-buttonrow">
        <div className="flex flex-row gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <ListFilter />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Sorter</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  sortByField("name", true);
                  setSelectedSortOption(0);
                }}
              >
                <span>
                  {selectedSortOption === 0 ? (
                    <b>{"Alfabetisk (a til å)"}</b>
                  ) : (
                    <a>{"Alfabetisk (a til å)"}</a>
                  )}
                </span>
                <DropdownMenuShortcut>
                  <ArrowDownAZ className="mr-2 h-4 w-4" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  sortByField("name", false);
                  setSelectedSortOption(1);
                }}
              >
                <span>
                  {selectedSortOption === 1 ? (
                    <b>{"Alfabetisk (å til a)"}</b>
                  ) : (
                    <a>{"Alfabetisk (å til a)"}</a>
                  )}
                </span>
                <DropdownMenuShortcut>
                  <ArrowUpAZ className="mr-2 h-4 w-4" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  sortByField("dateAdded", true);
                  setSelectedSortOption(2);
                }}
              >
                <span>
                  {selectedSortOption === 2 ? (
                    <b>{"Dato lagt til (eldste først)"}</b>
                  ) : (
                    <a>{"Dato lagt til (eldste først)"}</a>
                  )}
                </span>
                <DropdownMenuShortcut>
                  <ArrowDown01 className="mr-2 h-4 w-4" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  sortByField("dateAdded", false);
                  setSelectedSortOption(3);
                }}
              >
                <span>
                  {selectedSortOption === 3 ? (
                    <b>{"Dato lagt til (nyeste først)"}</b>
                  ) : (
                    <a>{"Dato lagt til (nyeste først)"}</a>
                  )}
                </span>
                <DropdownMenuShortcut>
                  <ArrowUp01 className="mr-2 h-4 w-4" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {editState && (
          <PencilLine
            onClick={() => {
              setEditState((prevState) => {
                return !prevState;
              });
            }}
          />
        )}
        {!editState && (
          <Pencil
            className="h-4 w-4"
            onClick={() => {
              setEditState((prevState) => {
                return !prevState;
              });
            }}
          />
        )}
      </div>
      <div className="recipe-grid">
        {sortedRecipes?.map((recipe: Recipe) => (
          <RecipeCard recipe={recipe} key={recipe.id} editState={editState} />
        ))}
      </div>
    </div>
  );
}
