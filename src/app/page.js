"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        alert(error.message);
        return;
      }

      alert("Usuario creado. Revisa tu correo si se solicita confirmación.");
    } catch (err) {
      alert("Error de conexión con Supabase");
      console.error(err);
    }
  };

  const handleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert(error.message);
        return;
      }

      alert("Sesión iniciada");
    } catch (err) {
      alert("Error de conexión con Supabase");
      console.error(err);
    }
  };

  const vote = async (project, decision) => {
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();

      if (userError || !userData?.user) {
        alert("Debes iniciar sesión para votar");
        return;
      }

      const { error } = await supabase.from("votes").insert([
        {
          project,
          vote: decision,
        },
      ]);

      if (error) {
        alert("No se pudo registrar el voto");
        console.error(error);
        return;
      }

      alert("Voto registrado con éxito");
    } catch (err) {
      alert("Error al guardar el voto");
      console.error(err);
    }
  };

  const news = [
    {
      title: "Presupuesto y ejecución pública",
      text: "Infórmate sobre cómo avanzan los recursos públicos en obras, educación, salud y transporte.",
      image:
        "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Seguimiento ciudadano",
      text: "Consulta proyectos públicos y comprende mejor en qué se está invirtiendo el dinero.",
      image:
        "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Noticias para informarse",
      text: "Un espacio para entender mejor el uso de recursos públicos en Colombia de forma simple.",
      image:
        "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  const projects = [
    {
      title: "Mejoramiento de vías locales",
      budget: "$12.500M",
      entity: "Alcaldía local",
      status: "En ejecución",
    },
    {
      title: "Dotación de colegios públicos",
      budget: "$8.200M",
      entity: "Secretaría de Educación",
      status: "En revisión",
    },
    {
      title: "Recuperación de espacio público",
      budget: "$5.900M",
      entity: "Instituto Distrital",
      status: "Planeación",
    },
  ];

  return (
    <main className="min-h-screen bg-[#efede9] text-[#152433]">
      <header className="sticky top-0 z-50 border-b border-black/10 bg-[#efede9]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              <span className="h-4 w-2 rounded-full bg-[#dd7a45]" />
              <span className="h-4 w-2 rounded-full bg-[#172434]" />
              <span className="h-4 w-2 rounded-full bg-[#79a9d1]" />
            </div>
            <h1 className="text-2xl font-semibold tracking-wide">Transparencia Fácil</h1>
          </div>

          <nav className="hidden gap-8 text-sm md:flex">
            <a href="#inicio" className="hover:opacity-60">Inicio</a>
            <a href="#noticias" className="hover:opacity-60">Noticias</a>
            <a href="#votacion" className="hover:opacity-60">Votación</a>
          </nav>
        </div>
      </header>

      <section id="inicio" className="mx-auto max-w-7xl px-6 py-10 md:py-14">
        <div
          className="overflow-hidden rounded-[28px] border border-black/10 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1600&q=80')",
          }}
        >
          <div className="bg-[#efede9]/75 px-6 py-10 backdrop-blur-sm md:px-12 md:py-14">
            <h2 className="text-4xl font-black leading-none md:text-7xl">
              Bienvenidos a Transparencia Fácil
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-[#243545]">
              Un espacio para informarse sobre el uso de recursos públicos en Colombia
              y participar opinando sobre proyectos públicos.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div className="space-y-6">
            <div className="rounded-[28px] bg-white p-8 shadow-sm ring-1 ring-black/5">
              <p className="text-sm uppercase tracking-[0.25em] text-[#5d6a76]">
                Acceso rápido
              </p>
              <h3 className="mt-3 text-3xl md:text-5xl font-black leading-tight">
                Ingresa para participar en las votaciones
              </h3>
              <p className="mt-4 max-w-xl text-[#314252]">
                En este MVP, las personas pueden explorar la información libremente,
                pero deben iniciar sesión o registrarse para votar sobre proyectos públicos.
              </p>

              <div className="mt-6 space-y-4">
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-[#d6d2cc] bg-[#f8f6f2] px-4 py-3 outline-none placeholder:text-[#6b7680]"
                />

                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-[#d6d2cc] bg-[#f8f6f2] px-4 py-3 outline-none placeholder:text-[#6b7680]"
                />

                <div className="flex gap-3">
                  <button
                    onClick={handleLogin}
                    className="flex-1 rounded-full bg-[#172434] px-4 py-3 text-sm font-semibold uppercase tracking-wider text-white hover:opacity-90"
                  >
                    Login
                  </button>

                  <button
                    onClick={handleRegister}
                    className="flex-1 rounded-full border border-[#172434] px-4 py-3 text-sm font-semibold uppercase tracking-wider text-[#172434] hover:bg-[#eef3f7]"
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-black/10 bg-white p-8 shadow-sm">
              <p className="text-3xl md:text-5xl font-black leading-tight">
                Conocer es el primer paso para transformar
              </p>
              <p className="mt-4 text-[#314252]">
                Descubre de forma clara y sencilla cómo se utilizan los recursos públicos en Colombia.
              </p>
              <a
                href="#noticias"
                className="mt-6 inline-block rounded-full bg-[#1a2a39] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white"
              >
                Explorar ahora
              </a>
            </div>
          </div>

          <div
            className="relative min-h-[580px] overflow-hidden rounded-[30px] border border-black/10 bg-cover bg-center grayscale"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80')",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="w-full max-w-md rounded-[32px] bg-white/90 p-8 text-center shadow-2xl">
                <p className="text-4xl font-semibold md:text-5xl">Conocer</p>
                <p className="mt-2 text-3xl italic md:text-4xl">es el primer</p>
                <p className="mt-2 text-4xl md:text-5xl">paso para</p>
                <p className="mt-4 text-4xl font-black uppercase md:text-6xl">Transformar</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="noticias" className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 border-b border-[#1a2a39] pb-5">
          <h3 className="text-4xl font-light tracking-wide md:text-7xl">
            NOTICIAS PARA INFORMARSE
          </h3>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {news.map((item) => (
            <article
              key={item.title}
              className="overflow-hidden rounded-[26px] bg-white shadow-sm ring-1 ring-black/5"
            >
              <div
                className="h-64 bg-cover bg-center"
                style={{ backgroundImage: `url('${item.image}')` }}
              />
              <div className="p-6">
                <h4 className="text-2xl font-bold">{item.title}</h4>
                <p className="mt-3 text-sm leading-6 text-[#314252]">{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="votacion" className="mx-auto max-w-7xl px-6 py-12 pb-20">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.25em] text-[#5d6a76]">
            Participación ciudadana
          </p>
          <h3 className="mt-3 text-4xl font-black md:text-6xl">
            Vota sobre proyectos públicos
          </h3>
          <p className="mt-4 max-w-2xl text-[#314252]">
            Este MVP permite que las personas opinen si están de acuerdo o no con ciertos
            proyectos públicos. Para votar, deben iniciar sesión.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.title}
              className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-black/5"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-[#6f7c88]">
                {project.status}
              </p>
              <h4 className="mt-2 text-2xl font-bold">{project.title}</h4>

              <div className="mt-4 space-y-2 text-sm text-[#314252]">
                <p>
                  <span className="font-semibold">Entidad:</span> {project.entity}
                </p>
                <p>
                  <span className="font-semibold">Presupuesto:</span> {project.budget}
                </p>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => vote(project.title, "yes")}
                  className="flex-1 rounded-full border border-[#1a2a39] px-4 py-3 text-sm font-semibold uppercase tracking-wider hover:bg-[#eef3f7]"
                >
                  De acuerdo
                </button>
                <button
                  onClick={() => vote(project.title, "no")}
                  className="flex-1 rounded-full bg-[#1a2a39] px-4 py-3 text-sm font-semibold uppercase tracking-wider text-white hover:opacity-90"
                >
                  En desacuerdo
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}