import Image from 'next/image';

import logo from '../../assets/images/logo.svg';

export function NavigationMenu() {
    return (
        <div id="navigation-menu" className="w-full h-[80px] bg-gray-800 px-4 flex justify-between items-center">
          <Image 
            src={logo} 
            alt={"Logo nlw copa"} 
          />
          <div>
            <ul className="flex gap-4 text-xl text-white">
              <a href="http://localhost:3000/" className=" transition-all hover:text-white-rgba">
                Criar sala
              </a>
              <a href="http://localhost:3000/my-rooms" className=" transition-all hover:text-white-rgba">
                Minhas salas
              </a>
            </ul>
          </div>
        </div>
    );
}