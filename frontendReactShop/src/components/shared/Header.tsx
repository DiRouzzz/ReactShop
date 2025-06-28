import { Link } from 'react-router-dom';
import { Container } from './Сontainer';
import { ArrowRight, Heart, ShoppingBag, User } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { ModeToggle } from '../mode-toggle';
import { SheetCart } from './SheetCart/SheetCart';
import { ButtonLink } from './ButtonLink';
import { checkAccess } from '@/utils/checkAccess';
import { ROLE, type Role } from '@/constants/role';
import { useAuth } from '@/app/AuthContext';
import { AdminMenu } from './AdminMenu';
import { useLogout } from '@/entities/auth';

interface IHeader {
  className?: string;
}

export const Header: React.FC<IHeader> = ({ className }) => {
  const { userData } = useAuth();
  const { mutate: logoutMutate, isPending: isLogoutPending } = useLogout();

  const isAuth = !!userData;

  const isAdmin = checkAccess([ROLE.ADMIN], userData?.user.roleId as Role);

  return (
    <header
      className={cn(
        'border border-b sticky top-0 z-50 bg-background backdrop-blur',
        className
      )}
    >
      <Container className="flex items-center justify-between py-8">
        <Link to="/">
          <div className="flex items-center gap-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Vitejs-logo.svg/410px-Vitejs-logo.svg.png"
              alt="logo"
              width={32}
              height={32}
            />
            <div>
              <h1 className="text-2xl font-black">React Shop</h1>
              <p className="text-sm text-gray-400 leading-3">
                лучший магазин в мире
              </p>
            </div>
          </div>
        </Link>
        <div className="flex items-center gap-3">
          {isAuth ? (
            <>
              <Button
                className="group relative"
                onClick={() => logoutMutate()}
                disabled={isLogoutPending}
              >
                <b>Выход</b>
                <span className="h-full w-[1px] bg-white/30 mx-3 dark:bg-black/30" />
                <div className="flex items-center gap-1 transition duration group-hover:opacity-0">
                  <p>{userData.user.email}</p>
                </div>
                <ArrowRight
                  size={20}
                  className="absolute right-5 transition duration-300 -translate-x-2 
								opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                />
              </Button>
              <ButtonLink to="/orders">
                Мои заказы
                <ShoppingBag className="ml-2" size={18} />
              </ButtonLink>
              <ButtonLink to="/favorites">
                Закладки
                <Heart className="ml-2" size={18} />
              </ButtonLink>
              <div>
                <SheetCart />
              </div>
            </>
          ) : (
            <ButtonLink to="/login">
              Войти
              <User className="ml-2" size={18} />
            </ButtonLink>
          )}
          {isAdmin && <AdminMenu />}
          <ModeToggle />
        </div>
      </Container>
    </header>
  );
};
