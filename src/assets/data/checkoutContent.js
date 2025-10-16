import CodIcon from "../images/Pages/Pr17.jpg";
import VisaIcon from "../images/Pages/Pr18.jpg";
import GcashIcon from "../images/Pages/Pr19.jpg";
import Shoe from "../images/Pages/Pr16.jpg";

const checkoutContent = {
  address: {
    name: "Zyra Batumbakal",
    email: "z*****@gmail.com",
    barangay: "Barangay Mamatid",
    zip: "****",
    municipality: "Cabuyao City",
    province: "Laguna",
    country: "Philippines",
  },

  paymentMethods: [
    { id: "cod", name: "Cash on delivery", icon: CodIcon },
    { id: "card", name: "Add credit/debit card", icon: VisaIcon },
    { id: "gcash", name: "Gcash", icon: GcashIcon },
  ],

  items: [
    {
      id: 1,
      name: "Nikers Shoes Brand",
      image: Shoe,
      price: 200.5,
      quantity: 1,
    },
    {
      id: 2,
      name: "Nikers Shoes Brand",
      image: Shoe,
      price: 200.5,
      quantity: 1,
    },
    {
      id: 3,
      name: "Nikers Shoes Brand",
      image: Shoe,
      price: 200.5,
      quantity: 1,
    },
  ],
};

export default checkoutContent;
