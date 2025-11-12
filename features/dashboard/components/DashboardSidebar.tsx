/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import {
  Code2,
  Compass,
  Database,
  FlameIcon,
  FolderPlus,
  History,
  Home,
  LayoutDashboard,
  Lightbulb,
  LucideIcon,
  Plus,
  Settings,
  Star,
  Terminal,
  Zap,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import  React ,{ useState } from "react";
import { PlaygrounDataProps } from "../types";

const LucideIconMap: Record<string, LucideIcon> = {
  Zap: Zap,
  Lightbulb: Lightbulb,
  Database: Database,
  Compass: Compass,
  FlameIcon: FlameIcon,
  Terminal: Terminal,
  Code2: Code2,
};

const DashboardSidebar = ({
  initialPlaygroundData,
}: {
  initialPlaygroundData: PlaygrounDataProps[];
}) => {

  const pathname = usePathname();
  
  const [starredPlaygrounds, setStarredPlaygrounds] = useState(initialPlaygroundData.filter((p) => p.starred));

  const [recentPlaygrounds, setRecentPlaygrounds] = useState(initialPlaygroundData);
  
  return (
    <div>
      <Sidebar variant="inset" collapsible="icon" className="border border-r">
        <SidebarHeader>
          <div className="flex items-center justify-center gap-2 px-4 py-3">
            <Image src={"/logo.svg"} alt="logo" height={60} width={60} />
          </div>
        </SidebarHeader>
        <SidebarContent>
          {/* GROUP-1 Home and Dashboard */}
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/"}
                  tooltip="Home"
                >
                  <Link href="/">
                    <Home className="h-4 w-4" />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/dashboard"}
                  tooltip="Dashboard"
                >
                  <Link href="/dashboard">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          {/* GROUP-2 Started Playgrounds */}
          <SidebarGroup>
            <SidebarGroupLabel>
              <Star className="mr-2 size-4" />
              starred
            </SidebarGroupLabel>
            <SidebarGroupAction title="Add starred Playground ">
              <Plus className="size-4" />
            </SidebarGroupAction>
            <SidebarGroupContent>
              <SidebarMenu>
                {starredPlaygrounds.length === 0 &&
                recentPlaygrounds.length === 0 ? (
                  <div className="text-muted-foreground w-full py-4 text-center">
                    {" "}
                    create your playground
                  </div>
                ) : (
                  starredPlaygrounds.map((playground) => {
                    const IconComponent =
                      LucideIconMap[playground.icon] || Code2;
                    return (
                      <SidebarMenuItem key={playground.id}>
                        <SidebarMenuButton
                          asChild
                          isActive={pathname === `/playground/${playground.id}`}
                          tooltip={playground.name}
                        >
                          <Link href={`/playground/${playground.id}`}>
                            {IconComponent && (
                              <IconComponent className="size-4" />
                            )}
                            <span>{playground.name}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })
                )}
              </SidebarMenu>
            </SidebarGroupContent>{" "}
          </SidebarGroup>
          {/* GROUP-3 Recents */}
          <SidebarGroup>
            <SidebarGroupLabel>
              <History className="mr-2 h-4 w-4" />
              Recent
            </SidebarGroupLabel>
            <SidebarGroupAction title="Create new playground">
              <FolderPlus className="h-4 w-4" />
            </SidebarGroupAction>
            <SidebarGroupContent>
              <SidebarMenu>
                {starredPlaygrounds.length === 0 &&
                recentPlaygrounds.length === 0
                  ? null
                  : recentPlaygrounds.map((playground) => {
                      const IconComponent =
                        LucideIconMap[playground.icon] || Code2;
                      return (
                        <SidebarMenuItem key={playground.id}>
                          <SidebarMenuButton
                            asChild
                            isActive={
                              pathname === `/playground/${playground.id}`
                            }
                            tooltip={playground.name}
                          >
                            <Link href={`/playground/${playground.id}`}>
                              {IconComponent && (
                                <IconComponent className="h-4 w-4" />
                              )}
                              <span>{playground.name}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="View all">
                    <Link href="/playgrounds">
                      <span className="text-muted-foreground text-sm">
                        View all playgrounds
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Settings">
                <Link href="/settings">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </div>
  );
};

export default DashboardSidebar;
