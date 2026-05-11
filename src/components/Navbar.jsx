import logo from '../assets/rodacredits_logo.jfif'

function Navbar() {
  return (
    <nav className="bg-[#1a1f2e] px-6 py-3 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-3">
        <img 
          src={logo} 
          alt="Roda" 
          className="h-10 w-10 rounded-full object-cover"
        />
        <span className="text-white text-xl font-bold tracking-wide">
          Roda <span className="text-[#c8f000]">Credits</span>
        </span>
      </div>
      <span className="text-gray-400 text-sm hidden md:block">
        Movilidad Eléctrica · Financiamiento Inclusivo
      </span>
    </nav>
  )
}

export default Navbar