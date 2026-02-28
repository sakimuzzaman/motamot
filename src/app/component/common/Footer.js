import Link from "next/link";

const Footer = () => {
  return (
    <footer className='bg-[#F0F2FF] text-black flex justify-around items-center w-full h-[143px] mt-[2rem]'>
      <p>কপিরাইট মতামতমঞ্চ @ ২০২৪.কম </p>
      <p>
        আরও বিস্তারিত জানতে{" "}
        {/* <Link href="tel:+8801318571939" className=" cursor-pointer font-bold hover:text-mainButtonColor hover:underline">
          যোগাযোগ করুন
        </Link> */}
        <Link href="/contacts" className=" cursor-pointer font-bold hover:text-mainButtonColor hover:underline">
          যোগাযোগ করুন
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
