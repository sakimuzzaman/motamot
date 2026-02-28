// export const api = 'http://127.0.0.1:8000/api';

export const api = 'https://admin.motamot.io/api';

export const dateConvertBd = (dateString) => {
 
        // Convert English numbers to Bangla numbers
        const convertToBanglaDigits = (number) => {
            const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
            return number.toString().replace(/\d/g, (digit) => banglaDigits[digit]);
        };

        // Parse the date
        const date = new Date(dateString);

        // Get day, month, and year in Bangla
        const banglaMonths = [
            "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
            "জুলাই", "অগাস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
        ];
        const day = convertToBanglaDigits(date.getDate());
        const month = banglaMonths[date.getMonth()];
        const year = convertToBanglaDigits(date.getFullYear());

        // Get hours and minutes in Bangla
        const hours = convertToBanglaDigits(date.getHours().toString().padStart(2, "0"));
        const minutes = convertToBanglaDigits(date.getMinutes().toString().padStart(2, "0"));

        // Return formatted string
        return `${day} ${month} ${year}, ${hours}:${minutes}`;
    };