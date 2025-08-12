"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getOrganizations, getCurrentOrganization } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface OrganizationSwitcherProps extends PopoverTriggerProps {}

export function OrganizationSwitcher({ className }: OrganizationSwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedOrganization, setSelectedOrganization] = React.useState(
    getCurrentOrganization()
  );
  const organizations = getOrganizations();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select an organization"
          className={cn("w-[200px] justify-between", className)}
        >
          <Avatar className="mr-2 h-5 w-5">
            <AvatarImage
              src={selectedOrganization.avatar}
              alt={selectedOrganization.name}
              data-ai-hint="logo"
            />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          {selectedOrganization.name}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search organization..." />
            <CommandEmpty>No organization found.</CommandEmpty>
            <CommandGroup heading="Organizations">
              {organizations.map((org) => (
                <CommandItem
                  key={org.id}
                  onSelect={() => {
                    setSelectedOrganization(org);
                    setOpen(false);
                  }}
                  className="text-sm"
                >
                  <Avatar className="mr-2 h-5 w-5">
                    <AvatarImage
                      src={org.avatar}
                      alt={org.name}
                      className="grayscale"
                      data-ai-hint="logo"
                    />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  {org.name}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedOrganization.id === org.id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
