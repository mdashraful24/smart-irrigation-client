const Highlight = () => {
    return (
        <div className="container mx-auto pb-20 px-4">

            {/* Header */}
            <div className="mb-12 text-center">
                <h2 className="text-4xl font-bold">
                    Why teams choose us
                </h2>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                    Powerful features designed to help you move faster and work smarter.
                </p>
            </div>

            {/* Cards */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

                <div className="group rounded-2xl bg-linear-to-br from-indigo-50 to-white p-4 md:p-6 lg:p-8 shadow-sm ring-1 ring-gray-200 transition hover:shadow-lg">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 font-bold">
                        01
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                        Clean Architecture
                    </h3>
                    <p className="mt-3 text-gray-600 leading-relaxed">
                        Well-structured components that are easy to scale and maintain over time.
                    </p>
                </div>

                <div className="group rounded-2xl bg-linear-to-br from-indigo-50 to-white p-4 md:p-6 lg:p-8 shadow-sm ring-1 ring-gray-200 transition hover:shadow-lg">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 font-bold">
                        02
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                        Lightning Fast
                    </h3>
                    <p className="mt-3 text-gray-600 leading-relaxed">
                        Optimized performance with utility-first styling and modern tooling.
                    </p>
                </div>

                <div className="group rounded-2xl bg-linear-to-br from-indigo-50 to-white p-4 md:p-6 lg:p-8 shadow-sm ring-1 ring-gray-200 transition hover:shadow-lg">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 font-bold">
                        03
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                        Consistent UI
                    </h3>
                    <p className="mt-3 text-gray-600 leading-relaxed">
                        Design systems that ensure consistency across your entire product.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Highlight;
