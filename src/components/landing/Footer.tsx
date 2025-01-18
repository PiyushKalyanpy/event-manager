import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="bg-neutral-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Product</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="#"
                                    className="text- neutral-400 hover:text-white"
                                >
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text- neutral-400 hover:text-white"
                                >
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text- neutral-400 hover:text-white"
                                >
                                    Integrations
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Company</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="#"
                                    className="text- neutral-400 hover:text-white"
                                >
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text- neutral-400 hover:text-white"
                                >
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text- neutral-400 hover:text-white"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">
                            Resources
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="#"
                                    className="text- neutral-400 hover:text-white"
                                >
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text- neutral-400 hover:text-white"
                                >
                                    Documentation
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text- neutral-400 hover:text-white"
                                >
                                    Help Center
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="#"
                                    className="text- neutral-400 hover:text-white"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text- neutral-400 hover:text-white"
                                >
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text- neutral-400 hover:text-white"
                                >
                                    Cookie Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border- neutral-700 text-center">
                    <p className="text- neutral-400">
                        &copy; 2023 EventPro. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
