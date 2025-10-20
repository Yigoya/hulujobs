import React, { useState, useEffect, useRef } from "react";
// Import local logo to ensure Vite resolves the asset correctly
import logo from "../assets/logo.png";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Search,
  Menu,
  X,
  User,
  LogIn,
  UserPlus,
  Bell,
  Download,
  Home,
  Settings,
  LogOut,
  Crown,
  Globe,
} from "lucide-react";
import { format } from "date-fns";
import api from "../../lib/axios";
import { logout } from "../../store/slices/authSlice";
import {
  setNotifications,
  markAsRead,
  markAllAsRead,
} from "../../store/slices/notificationSlice";
import { useTranslation } from "react-i18next";
import { setMainSubcategory } from "../../store/dataSlice";
import { subcriptionLogout } from "../../store/slices/subscriptionSlice";
import { API_URL_FILE } from "../api";

export default function Navbar({ isTender, isB2BPage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { subcategory, mainsubcategory, isOnMainSubcategory, loading } =
    useSelector((state) => state.data);
  const { user } = useSelector((state) => state.auth);
  const { notifications, unreadCount } = useSelector(
    (state) => state.notification
  );
  const queryParams = new URLSearchParams(window.location.search);
  const isTenderQuery = queryParams.get("isTender");
  const isFromTender = isTenderQuery === "true" || isTender;

  console.log(isFromTender);

  // Add refs for dropdowns
  const langMenuRef = useRef(null);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  const changeLanguage = (lng) => {
    if (i18n) {
      i18n.changeLanguage(lng);
      localStorage.setItem("language", lng);
      setIsLangMenuOpen(false);
      window.location.reload();
    }
  };

  // Get language display name based on code
  const getLanguageDisplay = (code) => {
    const languages = {
      en: "English",
      am: "አማርኛ",
      om: "Afaan Oromoo",
    };
    return languages[code] || code.toUpperCase();
  };

  const isInSubcategory = () => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      return (
        (path.includes("/service-categories") ||
          path.includes("/technician-list")) &&
        !isOnMainSubcategory
      );
    }
    return false;
  };

  const isInCompanyPage = () => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      console.log(path);
      return (
        path.includes("/subcategories") ||
        path.includes("/business") ||
        path.includes("/business-details")
      );
    }
    return false;
  };

  const getPath = () => {
    if (typeof window !== "undefined") {
      return window.location.pathname;
    }
    return "";
  };

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  const fetchNotifications = async () => {
    try {
      const response = await api.get(`/notifications/unread/${user?.id}`);
      dispatch(setNotifications(response.data));
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/mark-as-read`);
      dispatch(markAsRead(id));
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await api.put(`/mark-all-as-read/${user?.id}`);
      dispatch(markAllAsRead());
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
    }
  };

  console.log(isFromTender, isTender, isTender || isFromTender);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(subcriptionLogout());
    navigate("/login");
  };

  // Click outside handler for dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      // Language menu
      if (
        isLangMenuOpen &&
        langMenuRef.current &&
        !langMenuRef.current.contains(event.target)
      ) {
        setIsLangMenuOpen(false);
      }
      // Notification menu
      if (
        isNotificationOpen &&
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationOpen(false);
      }
      // Profile menu
      if (
        isProfileOpen &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLangMenuOpen, isNotificationOpen, isProfileOpen]);

  return (
    <nav
      className={`bg-[#2b78ac]
       backdrop-blur-md shadow-lg fixed top-0 w-full z-50 text-gray-50`}
    >
      <div
        className={`${
          !isTender && !isB2BPage && "max-w-7xl"
        } mx-auto px-4 sm:px-6 lg:px-8`}
      >
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={() => {
                console.log(mainsubcategory, "mainsubcategory");
                if (isTender) {
                  navigate("/");
                } else if (isInSubcategory()) {
                  dispatch(setMainSubcategory(mainsubcategory));
                  navigate("/service-categories");
                } else if (isInCompanyPage()) {
                  navigate("/companies");
                } else {
                  navigate("/");
                }
              }}
              className="flex items-center cursor-pointer"
            >
              <img
                src={logo}
                alt="HuluMoya Logo"
                className="h-10 w-auto object-cover"
              />
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                {isFromTender && (
                  <Link
                    to="/tender"
                    className="flex items-center px-4 py-2 text-sm "
                  >
                    <Home className="h-4 w-4 mr-1" />
                    <span>Home</span>
                  </Link>
                )}
                {/* Language Selector */}
                <div className="relative" ref={langMenuRef}>
                  <button
                    onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                    className="flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 gap-1"
                  >
                    <Globe className="h-4 w-4 mr-1" />
                    <span>
                      {i18n ? getLanguageDisplay(i18n.language) : "EN"}
                    </span>
                  </button>

                  {isLangMenuOpen && (
                    <div
                      className={`absolute right-0 mt-2 w-36 text-gray-700 ${
                        isTender ? "bg-[#2b78ac]" : "bg-white"
                      } rounded-md shadow-lg py-1 z-10`}
                    >
                      <button
                        onClick={() => changeLanguage("en")}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-500"
                      >
                        English
                      </button>
                      <button
                        onClick={() => changeLanguage("am")}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-500"
                      >
                        አማርኛ
                      </button>
                      <button
                        onClick={() => changeLanguage("om")}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-500"
                      >
                        Afaan Oromoo
                      </button>
                    </div>
                  )}
                </div>
                <div className="relative" ref={notificationRef}>
                  <button
                    onClick={() => {
                      setIsNotificationOpen(!isNotificationOpen);
                      setIsProfileOpen(false);
                    }}
                    className="relative   p-2 rounded-full hover:bg-gray-400 transition-colors duration-200"
                  >
                    <Bell className="h-6 w-6" />
                    {unreadCount > 0 && (
                      <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {isNotificationOpen && (
                    <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl py-2 z-50">
                      <div className="flex items-center justify-between px-4 py-2 border-b">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Notifications
                        </h3>
                        <button
                          onClick={handleMarkAllAsRead}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          Mark all as read
                        </button>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="px-4 py-3 text-sm text-gray-500">
                            No new notifications
                          </div>
                        ) : (
                          notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                                !notification.readStatus ? "bg-blue-50" : ""
                              }`}
                              onClick={() => handleMarkAsRead(notification.id)}
                            >
                              <div className="flex justify-between items-start">
                                <p className="text-sm font-medium text-gray-900">
                                  {notification.title}
                                </p>
                                <span className="text-xs text-gray-500">
                                  {format(
                                    new Date(notification.deliveryDate),
                                    "MMM d, h:mm a"
                                  )}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">
                                {notification.message}
                              </p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => {
                      setIsProfileOpen(!isProfileOpen);
                      setIsNotificationOpen(false);
                    }}
                    className="flex items-center space-x-2  "
                  >
                    {user.profileImage ? (
                      <img
                        src={`${API_URL_FILE}${user.profileImage}`}
                        alt={user.name}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-[#3385bb] font-medium">
                          {user.name ? user.name.charAt(0) : "U"}
                        </span>
                      </div>
                    )}
                    <span className="text-sm font-medium">
                      {user.name || "User"}
                    </span>
                  </button>

                  {isProfileOpen && (
                    <div
                      className={`absolute right-0 mt-2 w-48 text-gray-700 ${
                        isTender ? "bg-[#2b78ac]" : "bg-white"
                      } rounded-lg shadow-xl py-2 z-50`}
                    >
                      <Link
                        to="/customer/dashboard"
                        className="flex items-center px-4 py-2 text-sm  hover:bg-gray-500"
                      >
                        <Home className="h-4 w-4 mr-2" />
                        Dashboard
                      </Link>
                      <Link
                        to="/subscription"
                        className="flex items-center px-4 py-2 text-sm  hover:bg-gray-500"
                      >
                        <Crown className="h-4 w-4 mr-2" />
                        Subscription
                        {user?.subscription && (
                          <span className="ml-auto text-xs font-medium px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                            {user.subscription.name}
                          </span>
                        )}
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center px-4 py-2 text-sm  hover:bg-gray-500"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Language Selector */}
                {isFromTender && (
                  <Link
                    to="/tender"
                    className="flex items-center px-4 py-2 text-sm"
                  >
                    <Home className="h-4 w-4 mr-1" />
                    <span>Home</span>
                  </Link>
                )}
                <div className="relative" ref={langMenuRef}>
                  <button
                    onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                    className="flex items-center   px-3 py-2 text-sm font-medium transition-colors duration-200 gap-1"
                  >
                    <Globe className="h-4 w-4 mr-1" />
                    <span>
                      {i18n ? getLanguageDisplay(i18n.language) : "EN"}
                    </span>
                  </button>

                  {isLangMenuOpen && (
                    <div
                      className={`absolute right-0 mt-2 w-36 ${
                        isTender ? "bg-[#2b78ac]" : "bg-white"
                      } rounded-md shadow-lg py-1 z-10`}
                    >
                      <button
                        onClick={() => changeLanguage("en")}
                        className="block w-full text-left px-4 py-2 text-sm  hover:bg-gray-500"
                      >
                        English
                      </button>
                      <button
                        onClick={() => changeLanguage("am")}
                        className="block w-full text-left px-4 py-2 text-sm  hover:bg-gray-500"
                      >
                        አማርኛ
                      </button>
                      <button
                        onClick={() => changeLanguage("om")}
                        className="block w-full text-left px-4 py-2 text-sm  hover:bg-gray-500"
                      >
                        Afaan Oromoo
                      </button>
                    </div>
                  )}
                </div>
                <button className="flex items-center   px-3 py-2 text-sm font-medium transition-colors duration-200">
                  <Download className="h-4 w-4 mr-1" />
                  Get App
                </button>

                {isTender ? (
                  <>
                    <a
                      href="#about"
                      className="  px-3 py-2 text-sm font-medium transition-colors duration-200"
                    >
                      About
                    </a>
                    <a
                      href="#contact"
                      className="  px-3 py-2 text-sm font-medium transition-colors duration-200"
                    >
                      Contact
                    </a>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="flex items-center space-x-1   px-3 py-2 text-sm font-medium transition-colors duration-200"
                    >
                      <LogIn className="h-4 w-4" />
                      <span>Login</span>
                    </Link>
                    <button
                      onClick={() => {
                        if (isTender) {
                          navigate("/signup?type=tender");
                        } else if (
                          isInCompanyPage() ||
                          getPath().includes("/companies")
                        ) {
                          navigate("/signup?type=company");
                        } else if (
                          isInSubcategory() ||
                          getPath().includes("/service-categories")
                        ) {
                          dispatch(setMainSubcategory(mainsubcategory));
                          navigate("/signup?type=technician");
                        } else {
                          navigate("/signup");
                        }
                      }}
                      className="flex items-center space-x-1 bg-gradient-to-r from-[#3385bb] to-[#2a6c99] text-white px-4 py-2 rounded-full text-sm font-medium hover:from-[#3385bb] hover:to-[#2a6c99] transition-all duration-200 transform hover:scale-105"
                    >
                      <UserPlus className="h-4 w-4" />
                      <span>Register</span>
                    </button>
                  </>
                )}
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            {user && (
              <button
                onClick={() => {
                  setIsNotificationOpen(!isNotificationOpen);
                  setIsMenuOpen(false);
                }}
                className="relative p-2 mr-2  "
              >
                <Bell className="h-6 w-6" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
            )}
            <button
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                setIsNotificationOpen(false);
              }}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {user ? (
              <>
                <div className="px-3 py-2 border-b">
                  <div className="flex items-center space-x-3">
                    {user.profileImage ? (
                      <img
                        src={`${API_URL_FILE}${user.profileImage}`}
                        alt={user.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-medium">
                          {user.name ? user.name.charAt(0) : "U"}
                        </span>
                      </div>
                    )}
                    <div>
                      <div className="font-medium text-gray-900">
                        {user.name || "User"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {user.email || "user@example.com"}
                      </div>
                    </div>
                  </div>
                </div>
                <Link
                  to="/customer/dashboard"
                  className="block px-3 py-2 text-base font-medium  "
                >
                  Dashboard
                </Link>
                <Link
                  to="/subscription"
                  className="flex items-center px-4 py-2 text-sm  hover:bg-gray-100"
                >
                  <Crown className="h-4 w-4 mr-2" />
                  Subscription
                  {user?.subscription && (
                    <span className="ml-auto text-xs font-medium px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      {user.subscription.name}
                    </span>
                  )}
                </Link>
                <Link
                  to="/settings"
                  className="block px-3 py-2 text-base font-medium  "
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <a
                  href="#services"
                  className="block px-3 py-2 text-base font-medium  "
                >
                  Services
                </a>
                <a
                  href="#about"
                  className="block px-3 py-2 text-base font-medium  "
                >
                  About
                </a>
                <a
                  href="#contact"
                  className="block px-3 py-2 text-base font-medium  "
                >
                  Contact
                </a>
                <hr className="my-2" />
                <button className="flex w-full items-center px-3 py-2 text-base font-medium  ">
                  <Download className="h-5 w-5 mr-2" />
                  Get Mobile App
                </button>
                <Link
                  to="/login"
                  className="flex w-full items-center px-3 py-2 text-base font-medium  "
                >
                  <LogIn className="h-5 w-5 mr-2" />
                  Login
                </Link>
                <Link
                  to="/signup/customer"
                  className="flex w-full items-center px-3 py-2 text-base font-medium  "
                >
                  <UserPlus className="h-5 w-5 mr-2" />
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* Mobile notifications */}
      {isNotificationOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-2 border-b flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Notifications
            </h3>
            <button
              onClick={handleMarkAllAsRead}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Mark all as read
            </button>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500">
                No new notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                    !notification.readStatus ? "bg-blue-50" : ""
                  }`}
                  onClick={() => handleMarkAsRead(notification.id)}
                >
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-medium text-gray-900">
                      {notification.title}
                    </p>
                    <span className="text-xs text-gray-500">
                      {format(
                        new Date(notification.deliveryDate),
                        "MMM d, h:mm a"
                      )}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {notification.message}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
