import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router';
import { Droplets } from 'lucide-react';

const Footer = () => {
    const { t } = useTranslation();

    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black text-white border-t border-gray-200">
            <div className="container mx-auto px-4 pb-5 pt-10">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-40 mb-8">
                    {/* Brand */}
                    <div className="col-span-1 space-y-5 pb-10 lg:pb-2">
                        <NavLink to="/" className="flex items-center justify-center lg:justify-start space-x-3 group">
                            <div className="w-10 h-10 bg-linear-to-br from-green-500 to-green-600 
                                    rounded-xl flex items-center justify-center shadow-md 
                                    group-hover:shadow-lg transition-shadow duration-300">
                                <Droplets className="w-8 h-8 text-white" />
                            </div>
                            <span className="text-2xl lg:text-3xl font-bold text-green-600 tracking-tight">
                                {t('brand')}
                            </span>
                        </NavLink>
                        <p className="max-w-lg mx-auto text-sm text-center lg:text-start leading-relaxed">
                            {t('footer.description')}
                        </p>
                    </div>

                    <div className='col-span-2'>
                        <div className='grid grid-cols-2 md:grid-cols-3 md:justify-items-center-safe gap-8'>
                            {/* Navigation */}
                            <div>
                                <h3 className="font-bold mb-3">{t('footer.navigationLabel')}</h3>
                                <ul className="space-y-2">
                                    <li><Link to="/" className="hover:text-green-500 text-sm">{t('nav.home')}</Link></li>
                                    <li><Link to="/about" className="hover:text-green-500 text-sm">{t('nav.about')}</Link></li>
                                    <li><Link to="/highlight" className="hover:text-green-500 text-sm">{t('nav.highlight')}</Link></li>
                                </ul>
                            </div>

                            {/* Contact */}
                            <div>
                                <h3 className="font-bold mb-3">{t('footer.contactLabel')}</h3>
                                <ul className="space-y-3 text-sm break-all">
                                    <li className='hover:text-green-500 hover:underline'><a href="mailto:contact@smartirrigation.com">contact@smartirrigation.com</a></li>
                                    <li className='hover:text-green-500 hover:underline'><a href="tel:+15551234567">+1 (555) 123-4567</a></li>
                                    <li>{t('footer.contact.2.value')}</li>
                                </ul>
                            </div>

                            {/* Legal */}
                            <div>
                                <h3 className="font-bold mb-3">{t('footer.legalLabel')}</h3>
                                <ul className="space-y-2">
                                    <li><Link to="/privacy" className="hover:text-green-500 text-sm">{t('footer.legal.0.title')}</Link></li>
                                    <li><Link to="/terms" className="hover:text-green-500 text-sm">{t('footer.legal.1.title')}</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center text-sm text-gray-400">
                    {t('footer.copyright', { year: currentYear })}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
