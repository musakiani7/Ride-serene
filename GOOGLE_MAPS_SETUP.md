# 🗺️ Google Maps Places Autocomplete Setup Guide

## ✅ Already Implemented

Your application **already has Google Maps Places Autocomplete** fully integrated! The `AutocompleteInput` component is ready to use.

## 🔑 How to Add Your Google Maps API Key

### Step 1: Get a Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** > **Credentials**
4. Click **Create Credentials** > **API Key**
5. Copy your API key

### Step 2: Enable Required APIs

In the Google Cloud Console, enable these APIs for your project:

1. **Places API** - For address autocomplete
2. **Maps JavaScript API** - For map functionality
3. **Geocoding API** - For address details

Navigate to **APIs & Services** > **Library** and search for each API to enable them.

### Step 3: Add API Key to Your Project

Open the file: `E:\Sher Khan Lemosine\frontend\.env`

Replace `YOUR_GOOGLE_MAPS_API_KEY_HERE` with your actual API key:

```env
VITE_GOOGLE_MAPS_API_KEY=AIzaSyC_YOUR_ACTUAL_API_KEY_HERE
```

### Step 4: Restart the Development Server

After adding your API key, restart the dev server:

```bash
cd "E:\Sher Khan Lemosine\frontend"
npm run dev
```

## 🎯 How It Works

### The AutocompleteInput component:

1. **Loads Google Maps API** automatically when the component mounts
2. **Debounces user input** (250ms delay) to reduce API calls
3. **Shows predictions** in a dropdown portal
4. **Returns full place details** including:
   - Formatted address
   - Latitude/Longitude coordinates
   - Address components (street, city, country, etc.)
   - Place ID

### Already Integrated In:

✅ **Hero Component** (Home page booking form)
- "From" location field
- "To" destination field

## 🔧 Configuration Options

The `AutocompleteInput` component accepts these props:

```javascript
<AutocompleteInput
  id="from"
  name="from"
  placeholder="City, address, airport, hotel, ..."
  value={formData.from}
  onChange={handleInputChange}
  types={["(cities)"]}              // Optional: restrict to cities
  componentRestrictions={{           // Optional: restrict to countries
    country: ["us", "ca", "gb"]
  }}
  returnPlaceDetails={true}          // Returns full place details
  onSelect={({ prediction, details }) => {
    // Access coordinates, address components, etc.
    console.log(details.geometry.location.lat());
    console.log(details.geometry.location.lng());
  }}
/>
```

## 📍 Types of Places You Can Search

Change the `types` prop to restrict searches:

```javascript
types={["(cities)"]}           // Only cities
types={["address"]}            // Street addresses
types={["airport"]}            // Airports
types={["establishment"]}      // Businesses/landmarks
types={["geocode"]}            // All geocodable addresses
```

## 🌍 Restrict to Specific Countries

Use `componentRestrictions` to limit results:

```javascript
componentRestrictions={{ country: ["us", "ca"] }}  // USA & Canada
componentRestrictions={{ country: ["gb", "fr", "de"] }}  // UK, France, Germany
componentRestrictions={{ country: ["pk"] }}  // Pakistan only
```

## 🎨 UI Features

The autocomplete dropdown shows:
- **Location pin icon** for addresses
- **Building icon** for establishments/businesses
- **Main text** (street name or place name)
- **Secondary text** (city, country details)
- **"Powered by Google"** branding (required by Google)

## 🔒 Security Best Practices

### API Key Restrictions (Recommended)

In Google Cloud Console, add restrictions to your API key:

1. **Application restrictions**: 
   - HTTP referrers (websites)
   - Add: `http://localhost:*/*` for development
   - Add: `https://yourdomain.com/*` for production

2. **API restrictions**:
   - Restrict to: Places API, Maps JavaScript API, Geocoding API

### Environment Variables

- ✅ API key is stored in `.env` file (not committed to git)
- ✅ `.env.example` template provided
- ✅ Accessed via `import.meta.env.VITE_GOOGLE_MAPS_API_KEY`

## 📊 Testing the Integration

1. Open your app: http://localhost:5175/
2. Go to the home page
3. Click on the "From" or "To" input field
4. Start typing an address (e.g., "New York")
5. You should see autocomplete suggestions appear

## 💰 Pricing

Google Maps Platform has a **free tier**:
- First $200/month of usage is **FREE**
- Places Autocomplete: ~$2.83 per 1,000 requests
- With the free tier, you get ~70,000+ autocomplete requests/month free

## 🐛 Troubleshooting

### "Autocomplete will not work" warning in console

**Problem**: `VITE_GOOGLE_MAPS_API_KEY` is not set

**Solution**: Add your API key to `.env` file and restart the server

### No suggestions appearing

**Problem**: API key might not have the right APIs enabled

**Solution**: Enable Places API, Maps JavaScript API in Google Cloud Console

### "This API key is not authorized to use this service"

**Problem**: API restrictions are too strict or APIs not enabled

**Solution**: Check API restrictions in Google Cloud Console

## 📝 Current Implementation Status

✅ Google Maps Places API integration complete
✅ AutocompleteInput component ready
✅ Hero form uses autocomplete for From/To fields
✅ Place details with coordinates returned
✅ Mobile-responsive dropdown
✅ Debounced API calls (performance optimized)
✅ Proper error handling
✅ Beautiful UI with icons

## 🚀 Next Steps

1. **Add your Google Maps API key** to `.env` file
2. **Restart the dev server**
3. **Test the autocomplete** on the home page
4. (Optional) Customize `types` or `componentRestrictions` based on your needs

## 📧 Need Help?

If you encounter issues:
1. Check browser console for error messages
2. Verify API key is correct in `.env`
3. Ensure required APIs are enabled in Google Cloud Console
4. Check API key restrictions aren't blocking requests

---

**Your autocomplete is ready to go!** Just add your API key and test it out! 🎉
