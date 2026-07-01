import { GithubLogo } from '@phosphor-icons/react';
import { API_URL } from '@/lib/api';

function startGithubLogin() {
  window.location.href = `${API_URL}/auth/github`;
}

export function LoginPage() {
  return (
    <>
      {/* ============================= Desktop ============================= */}
      <div className="hidden md:block relative min-h-screen w-full overflow-hidden bg-base-100">
        {/* Painel esquerdo */}
        <div className="absolute inset-y-0 left-0 w-[28%] bg-primary" />

        {/* Logo */}
        <h1 className="absolute top-10 left-[30%] lg:top-12 z-20 text-5xl lg:text-6xl font-extrabold tracking-tight text-primary">
          SiNutre
        </h1>

        {/* Imagem */}
        <div
          className="absolute z-10 left-0 -translate-y-1/2"
          style={{ top: '57%', width: '44%' }}
        >
          <div className="relative aspect-[596/419]">
            <img
              src="/plate.png"
              alt="Prato com vitaminas, proteínas, carboidratos e gorduras"
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Conteúdo */}
        <div className="absolute inset-y-0 left-[44%] right-0 z-20 flex items-center justify-center px-6">
          <WelcomeBlock />
        </div>
      </div>

      {/* ============================= Mobile ============================= */}
      <div className="md:hidden min-h-screen flex flex-col bg-base-100">
        <header className="bg-primary text-primary-content px-6 pt-10 pb-8 flex flex-col items-center">
          <div className="relative w-[85%] max-w-sm aspect-[596/419]">
            <img
              src="/plate.png"
              alt=""
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>
        </header>

        <main className="flex-1 flex flex-col px-6 py-8">
          <h1 className="text-4xl font-extrabold tracking-tight mb-8 text-primary">
            SiNutre
          </h1>

          <div className="flex-1 flex items-center justify-center">
            <WelcomeBlock />
          </div>
        </main>
      </div>
    </>
  );
}

function WelcomeBlock() {
  return (
    <div className="flex flex-col items-center gap-6 text-center max-w-sm w-full">
      <h2 className="text-4xl lg:text-5xl font-bold text-primary">
        Bem-vindo(a)!
      </h2>

      <p className="text-base lg:text-lg text-base-content/70">
        Faça login com GitHub para começar.
      </p>

      <button
        type="button"
        onClick={startGithubLogin}
        className="btn btn-neutral btn-lg gap-2"
      >
        <GithubLogo size={22} weight="fill" />
        Entrar com GitHub
      </button>
    </div>
  );
}