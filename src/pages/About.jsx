import logo from "/images/tribbu-logo-navigator.svg"
import { motion } from "framer-motion"

function About() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 ">
            <section className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-2xl">
                <div className="max-w-5xl mx-auto px-6 py-10 text-center">
                    <img className="max-h-18 mx-auto mb-4" src={logo} alt="" />
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Sobre Tribbu
                    </h1>
                    <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
                        Tribbu es el lugar donde organizar planes en grupo deja de ser un
                        caos y vuelve a ser algo sencillo, humano y agradable.
                    </p>
                </div>
            </section>

            <section className="max-w-5xl mx-auto px-6 py-16">
                <h2 className="text-3xl font-semibold mb-6">
                    ¿Qué es Tribbu?
                </h2>
                <p className="text-lg leading-relaxed text-gray-700">
                    Tribbu es una plataforma para <strong>crear, organizar y compartir
                        planes y experiencias en grupo</strong>. Desde quedadas con amigos,
                    planes familiares o pequeñas comunidades, Tribbu centraliza toda la
                    información en un solo sitio y elimina los interminables mensajes y
                    malentendidos.
                </p>
            </section>

            <section className="bg-white">
                <div className="max-w-5xl mx-auto px-6 py-16">
                    <h2 className="text-3xl font-semibold mb-6">
                        Nuestra misión
                    </h2>
                    <p className="text-lg leading-relaxed text-gray-700">
                        Queremos que organizar planes en grupo sea{" "}
                        <strong>fácil, claro y agradable</strong>, incluso cuando hay
                        horarios distintos, intereses diferentes y niveles de compromiso
                        variados.
                    </p>
                </div>
            </section>

            <section className="max-w-5xl mx-auto px-6 py-16">
                <h2 className="text-3xl font-semibold mb-10">
                    ¿Por qué Tribbu?
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <h3 className="text-xl font-semibold mb-3">
                            Menos caos, más claridad
                        </h3>
                        <p className="text-gray-700">
                            Toda la información del plan en un solo lugar, accesible para
                            todos.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <h3 className="text-xl font-semibold mb-3">
                            Decisiones compartidas
                        </h3>
                        <p className="text-gray-700">
                            Votaciones y acuerdos sin interminables cadenas de mensajes.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <h3 className="text-xl font-semibold mb-3">
                            Comunicación centralizada
                        </h3>
                        <p className="text-gray-700">
                            Todo el contexto del plan, siempre visible y actualizado.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <h3 className="text-xl font-semibold mb-3">
                            Pensado para crecer
                        </h3>
                        <p className="text-gray-700">
                            Desde planes pequeños hasta comunidades más grandes.
                        </p>
                    </div>
                </div>
            </section>
            <section className="bg-indigo-50">
                <div className="max-w-5xl mx-auto px-6 py-16 text-center">
                    <motion.h2
                        className="text-3xl font-semibold mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Conecta conmigo
                    </motion.h2>

                    <motion.p
                        className="text-lg text-gray-700 mb-2"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <strong>Pau Serrano Herraiz</strong> · Junior Full Stack Developer
                    </motion.p>

                    <motion.p
                        className="text-gray-600 mb-10 max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Tribbu es un proyecto personal creado y desarrollado con cariño.
                        Si quieres conocer más sobre mi trabajo como desarrollador o contactar conmigo,
                        aquí puedes encontrarme:

                    </motion.p>

                    <div className="flex justify-center gap-10">
                        {/* GitHub */}
                        <motion.a
                            href="https://github.com/PauSerranoHerraiz/"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -6, scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md"
                        >
                            <svg
                                className="w-12 h-12 mx-auto text-gray-800"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 .5C5.73.5.5 5.74.5 12.03c0 5.1 3.29 9.43 7.86 10.96.57.1.78-.25.78-.55v-2.02c-3.2.7-3.88-1.38-3.88-1.38-.53-1.35-1.29-1.71-1.29-1.71-1.06-.73.08-.72.08-.72 1.17.08 1.79 1.21 1.79 1.21 1.04 1.79 2.73 1.27 3.4.97.1-.76.4-1.27.73-1.56-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.3-.52-1.52.11-3.17 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.65.24 2.87.12 3.17.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.41-5.26 5.7.41.35.78 1.04.78 2.1v3.12c0 .31.21.66.79.55a11.53 11.53 0 0 0 7.85-10.96C23.5 5.74 18.27.5 12 .5z" />
                            </svg>
                            <p className="mt-3 font-medium">GitHub</p>
                        </motion.a>

                        {/* LinkedIn */}
                        <motion.a
                            href="https://www.linkedin.com/in/pau-serrano-herraiz-a1785384/"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -6, scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.4 }}
                            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md"
                        >
                            <svg
                                className="w-12 h-12 mx-auto text-[#0A66C2]"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M4.98 3.5C3.34 3.5 2 4.85 2 6.49c0 1.63 1.34 2.99 2.98 2.99h.02c1.65 0 2.99-1.36 2.99-2.99C7.99 4.85 6.65 3.5 4.98 3.5zM2.5 21.5h4.96V9.99H2.5V21.5zM9.5 9.99h4.75v1.57h.07c.66-1.25 2.27-2.57 4.67-2.57 5 0 5.93 3.29 5.93 7.57v5.94h-4.96v-5.26c0-1.25-.02-2.85-1.74-2.85-1.74 0-2.01 1.36-2.01 2.76v5.35H9.5V9.99z" />
                            </svg>
                            <p className="mt-3 font-medium">LinkedIn</p>
                        </motion.a>
                    </div>
                </div>
            </section>


        </div>
    );
}

export default About;