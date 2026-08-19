import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import DocsOverview from '../pages/DocsOverview';
import ProductOverview from '../pages/ProductOverview';
import ProxyDocs from '../pages/ProxyDocs';
import StatusCodesPage from '../pages/StatusCodesPage';

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Root overview */}
                <Route path="/act-proxyhub/userguide" element={<DocsOverview />} />

                <Route
                    path="/act-proxyhub/userguide/scrapedo-overview"
                    element={<ProductOverview />}
                />
                <Route
                    path="/act-proxyhub/userguide/scraper-overview"
                    element={<ProductOverview />}
                />

                <Route
                    path="/act-proxyhub/userguide/details/:product"
                    element={
                        <Navigate
                            to="/details/scrapedo/1"
                            replace
                        />
                    }
                />
                <Route
                    path="/act-proxyhub/userguide/details/:product/:id"
                    element={<ProxyDocs />}
                />

                 <Route
                    path="/act-proxyhub/userguide/status-codes"
                    element={<StatusCodesPage />}
                />

                {/* Fallback */}
                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/act-proxyhub/userguide"
                            replace
                        />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}