import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import DocsOverview from '../pages/DocsOverview';
import ProxyDocs from '../pages/ProxyDocs';
import StatusCodesPage from '../pages/StatusCodesPage';

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Root overview */}
                <Route path="/act-proxyhub/userguide" element={<DocsOverview />} />

                {/* Specific documentation detail page (no product slug needed) */}
                <Route
                    path="/act-proxyhub/userguide/details/:id"
                    element={<ProxyDocs />}
                />

                {/* Status Codes */}
                <Route
                    path="/act-proxyhub/userguide/status-codes"
                    element={<StatusCodesPage />}
                />

                {/* Fallback: Redirect any unknown routes to the root overview */}
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