import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Administrators from "./scenes/administrators";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Products from "./scenes/products";
// import Calendar from "./scenes/calendar/calendar";
import { setHeaderDefault, setLanguageDefault } from "./utils/setHeaderDefault";
import Order from "./scenes/orders";
import OrderDetail from "./scenes/orders/orderDetail";
import Customers from "./scenes/customers";
import AddProduct from "./scenes/add/products";
import EditProduct from "./scenes/add/edit";
import EditInfo from "./scenes/Info/edit";
import Category from "./scenes/categories/category";
import SignInSide from "./scenes/SignIn/SignInSide";
import MainPage from "./components/MainPage";
function App() {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
    setLanguageDefault("vn");

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Routes>
                    <Route
                        path="/"
                        element={<MainPage element={<Dashboard />} />}
                    />

                    <Route path="/team" element={<Team />} />
                    <Route
                        path="/admins"
                        element={<MainPage element={<Administrators />} />}
                    />
                    <Route
                        path="/orders"
                        element={<MainPage element={<Order />} />}
                    />
                    <Route
                        path="/customers"
                        element={<MainPage element={<Customers />} />}
                    />
                    <Route
                        path="/orders/:id/show"
                        element={<MainPage element={<OrderDetail />} />}
                    />
                    <Route
                        path="/customers/edit/:id"
                        element={<MainPage element={<EditInfo />} />}
                    />
                    <Route
                        path="/admin/edit/:id"
                        element={<MainPage element={<EditInfo />} />}
                    />
                    <Route
                        path={"/products/add"}
                        element={<MainPage element={<AddProduct />} />}
                    />
                    <Route
                        path="/product/edit/:id"
                        element={<MainPage element={<EditProduct />} />}
                    />
                    <Route
                        path="/categories"
                        element={<MainPage element={<Category />} />}
                    />
                    <Route
                        path="/products"
                        element={<MainPage element={<Products />} />}
                    />
                    <Route path="/sign" element={<SignInSide />} />

                    {/* <Route path="/invoices" element={<Invoices />} />
                    <Route path="/form" element={<Form />} />
                    <Route path="/bar" element={<Bar />} />
                    <Route path="/pie" element={<Pie />} />
                    <Route path="/line" element={<Line />} />
                    <Route path="/faq" element={<FAQ />} /> */}

                    {/* <Route path="/geography" element={<Geography />} /> */}
                </Routes>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
/*
<div className="app">
                    <Sidebar isSidebar={true} />
                    <main className="content">
                        <Topbar setIsSidebar={setIsSidebar} />
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/team" element={<Team />} />
                            <Route
                                path="/admins"
                                element={<Administrators />}
                            />
                            <Route path="/orders" element={<Order />} />
                            <Route path="/customers" element={<Customers />} />
                            <Route
                                path="/orders/:id/show"
                                element={<OrderDetail />}
                            />
                            <Route
                                path="/customers/edit/:id"
                                element={<EditInfo />}
                            />
                            <Route
                                path="/admin/edit/:id"
                                element={<EditInfo />}
                            />

                            <Route
                                path={"/products/add"}
                                element={<AddProduct />}
                            />
                            <Route
                                path="/product/edit/:id"
                                element={<EditProduct />}
                            />
                            <Route path="/categories" element={<Category />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/invoices" element={<Invoices />} />
                            <Route path="/form" element={<Form />} />
                            <Route path="/bar" element={<Bar />} />
                            <Route path="/pie" element={<Pie />} />
                            <Route path="/line" element={<Line />} />
                            <Route path="/faq" element={<FAQ />} />
                             <Route path="/calendar" element={<Calendar />} /> 
                            <Route path="/geography" element={<Geography />} />
                        </Routes>
                    </main>
                </div>*/
