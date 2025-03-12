import Circle from "../ui/Circle"

export default function Stats() {
    const stats = [
        { value: "5M+", label: "Customer" },
        { value: "450M+", label: "Coverage" },
        { value: "22%", label: "Earning" },
        { value: "8.03%", label: "Interest" },
    ]

    return (
        <section className="w-full min-h-full h-max py-24 lg:mt-20  bg-white/5 backdrop-blur-xl overflow-hidden">
            <div className="relative container mx-auto px-4">
                <div className="grid gap-8 grid-cols-2 md:grid-cols-4">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <h3 className="mb-2 text-4xl font-bold">{stat.value}</h3>
                            <p className="text-gray-400">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
