import { useState, useCallback, useMemo } from "react";
import { MenuItem, CustomerInfo, CustomerErrors, BookingData } from "./types";
import { generateAvailability } from "./utils/availability";
import { validateCustomer, hasValidationErrors } from "./utils/validation";
import { STYLISTS } from "./constants/stylists";
import { useScrolled } from "./hooks/useScrolled";
import { GlobalStyle } from "./components/GlobalStyle";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { StylistSection } from "./components/StylistSection";
import { MenuSection } from "./components/MenuSection";
import { CalendarSection } from "./components/CalendarSection";
import { CustomerForm } from "./components/CustomerForm";
import { ConfirmBar } from "./components/ConfirmBar";
import { PhoneBanner } from "./components/PhoneBanner";
import { Footer } from "./components/Footer";
import { ConfirmModal } from "./components/ConfirmModal";
import { CompletedModal } from "./components/CompletedModal";

const INITIAL_CUSTOMER: CustomerInfo = { name: "", phone: "", note: "" };

export default function App() {
  const scrolled = useScrolled();

  const [menuItems, setMenuItems] = useState<readonly MenuItem[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [customer, setCustomer] = useState<CustomerInfo>(INITIAL_CUSTOMER);
  const [customerErrors, setCustomerErrors] = useState<CustomerErrors>({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [currentView, setCurrentView] = useState("home");

  const [availability] = useState(() => {
    const now = new Date();
    return {
      ...generateAvailability(now.getFullYear(), now.getMonth()),
      ...generateAvailability(now.getFullYear(), now.getMonth() + 1),
    };
  });

  const toggleMenu = useCallback((item: MenuItem) => {
    setMenuItems((prev) =>
      prev.some((p) => p.id === item.id)
        ? prev.filter((p) => p.id !== item.id)
        : [...prev, item]
    );
  }, []);

  const navigate = useCallback((target: string) => {
    setCurrentView(target);
    if (target === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (target === "reserve") {
      document.getElementById("stylist")?.scrollIntoView({ behavior: "smooth" });
    } else {
      document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleDateSelect = useCallback((d: string) => {
    setSelectedDate(d);
    setSelectedTime(null);
  }, []);

  const handleCustomerChange = useCallback((info: CustomerInfo) => {
    setCustomer(info);
    setCustomerErrors({});
  }, []);

  const handleConfirmClick = useCallback(() => {
    const errors = validateCustomer(customer);
    if (hasValidationErrors(errors)) {
      setCustomerErrors(errors);
      document.getElementById("customer")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    setShowConfirm(true);
  }, [customer]);

  const handleConfirm = useCallback(() => {
    setShowConfirm(false);
    setShowCompleted(true);
  }, []);

  const handleCloseConfirm = useCallback(() => {
    setShowConfirm(false);
  }, []);

  const handleCloseCompleted = useCallback(() => {
    setShowCompleted(false);
    setMenuItems([]);
    setSelectedDate(null);
    setSelectedTime(null);
    setCustomer(INITIAL_CUSTOMER);
    setCustomerErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const canConfirm = useMemo(
    () =>
      menuItems.length > 0 &&
      Boolean(selectedDate) &&
      Boolean(selectedTime) &&
      Boolean(customer.name) &&
      Boolean(customer.phone),
    [menuItems, selectedDate, selectedTime, customer.name, customer.phone]
  );

  const bookingData: BookingData = useMemo(
    () => ({
      stylist: STYLISTS[0] ?? null,
      menuItems,
      date: selectedDate,
      time: selectedTime,
      customer,
    }),
    [menuItems, selectedDate, selectedTime, customer]
  );

  return (
    <>
      <GlobalStyle />
      <header>
        <Nav scrolled={scrolled} onNavigate={navigate} currentView={currentView} />
      </header>

      <main>
        <Hero onReserve={() => navigate("reserve")} />
        <PhoneBanner />

        <StylistSection />

        <div className="section-divider" aria-hidden="true">
          <div className="divider-dot" />
        </div>

        <MenuSection selectedItems={menuItems} onToggle={toggleMenu} />

        <div className="section-divider" aria-hidden="true">
          <div className="divider-dot" />
        </div>

        <CalendarSection
          selectedDate={selectedDate}
          onSelectDate={handleDateSelect}
          selectedTime={selectedTime}
          onSelectTime={setSelectedTime}
          availability={availability}
        />

        <div className="section-divider" aria-hidden="true">
          <div className="divider-dot" />
        </div>

        <CustomerForm
          info={customer}
          errors={customerErrors}
          onChange={handleCustomerChange}
        />
      </main>

      <ConfirmBar
        menuItems={menuItems}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        customer={customer}
        canConfirm={canConfirm}
        onConfirm={handleConfirmClick}
      />

      <Footer />

      {showConfirm && (
        <ConfirmModal
          data={bookingData}
          onClose={handleCloseConfirm}
          onConfirm={handleConfirm}
        />
      )}

      {showCompleted && <CompletedModal onClose={handleCloseCompleted} />}
    </>
  );
}
