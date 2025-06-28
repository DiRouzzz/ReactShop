import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@radix-ui/react-navigation-menu';
import { Link } from 'react-router-dom';
import { ShieldUser } from 'lucide-react';

export const AdminMenu = () => (
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger
          className="flex items-center px-4 py-2 rounded-md font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition min-w-[110px] cursor-pointer"
          style={{ minWidth: 110 }}
        >
          ADMIN
          <ShieldUser className="ml-2" size={20} />
        </NavigationMenuTrigger>
        <NavigationMenuContent
          className="absolute right-0 mt-2 w-56 rounded-md bg-popover shadow-lg ring-1 ring-black/5 z-50"
          style={{ minWidth: 220 }}
        >
          <ul className="flex flex-col p-2">
            <li>
              <NavigationMenuLink asChild>
                <Link
                  to="/users"
                  className="block rounded-md p-3 transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Пользователи
                </Link>
              </NavigationMenuLink>
            </li>
            <li>
              <NavigationMenuLink asChild>
                <Link
                  to="/products/create"
                  className="block rounded-md p-3 transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Добавить товар
                </Link>
              </NavigationMenuLink>
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
);
