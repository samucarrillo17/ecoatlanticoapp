
const photos = [
  { url: "Voluntario1.jpg" ,span:"md:col-span-2"},
  { url: "/Voluntario2.jpg", span: "" },
  { url: "/Voluntario3.jpg", span: "md:row-span-2" },
  { url: "/Voluntario4.jpg", span: "md:col-span-2" },
  { url: "/Voluntario5.jpg", span: "" },
  { url: "/Voluntario6.jpg", span: "md:row-span-2" },
  { url: "/Voluntario7.jpg", span: "md:col-span-2" },
]

export function PhotoGallery() {
  return (
    <section className="py-16 md:py-20 bg-brand-beige/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-balance">Vive la experiencia</h2>
          <p className="text-brand-balance/90 text-lg max-w-2xl mx-auto text-pretty">
            Así se ve el cambio cuando jóvenes como tú se unen por una causa
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[270px]">
          {photos.map((photo, index) => (
            <div key={index} className={`overflow-hidden rounded-2xl group cursor-pointer ${photo.span}`}>
              <img
                src={photo.url || "/placeholder.svg"}
                alt={`Voluntarios de EcoAtlántico ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
