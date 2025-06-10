<template>
  <div class="bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center font-sans">
    <div class="w-full max-w-md mx-auto p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg space-y-6">
      
      <!-- Header -->
      <div class="text-center">
        <h1 class="text-3xl font-bold text-gray-800 dark:text-white">QR-Code Generator</h1>
        <p class="text-gray-500 dark:text-gray-400 mt-2">Geben Sie eine URL ein, um sofort einen QR-Code zu erstellen.</p>
      </div>

      <!-- Eingabeformular -->
      <div class="space-y-4">
        <div>
          <label for="url-input" class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">URL</label>
          <input 
            id="url-input"
            v-model="url"
            type="url"
            placeholder="https://beispiel.com"
            class="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            @keyup.enter="generateQRCode"
          />
        </div>
        <button 
          @click="generateQRCode"
          class="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition-transform transform hover:scale-105"
        >
          QR-Code generieren
        </button>
      </div>

      <!-- Fehlermeldung -->
      <div v-if="errorMessage" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg" role="alert">
        <p class="font-bold">Fehler</p>
        <p>{{ errorMessage }}</p>
      </div>

      <!-- QR-Code Anzeige und Download -->
      <div v-if="qrCodeDataUrl" class="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <img :src="qrCodeDataUrl" alt="Generierter QR-Code" class="w-48 h-48 rounded-md shadow-sm">
        </div>
        <a
          :href="qrCodeDataUrl"
          download="qrcode.png"
          class="w-full flex items-center justify-center bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 transition-transform transform hover:scale-105"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
          Herunterladen
        </a>
      </div>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// Import the QR code library directly from node_modules.
import QRCode from 'qrcode';

// Defines the reactive variables for the application state.
const url = ref<string>('');
const qrCodeDataUrl = ref<string>('');
const errorMessage = ref<string>('');

// This function generates the QR code.
const generateQRCode = async () => {
  // Reset previous state on new generation
  qrCodeDataUrl.value = '';
  errorMessage.value = '';
  
  // Check if the URL input is empty.
  if (!url.value) {
    errorMessage.value = 'Bitte geben Sie eine gültige URL ein.';
    return;
  }
  
  try {
    // Options for the QR code generation.
    const options: QRCode.QRCodeToDataURLOptions = {
      width: 600,
      margin: 2,
      errorCorrectionLevel: 'H' // High error correction level
    };
    
    // Generate the QR code as a Data URL using the imported library.
    const dataUrl = await QRCode.toDataURL(url.value, options);
    qrCodeDataUrl.value = dataUrl;
    
  } catch (err) {
    // Handle potential errors during QR code generation.
    console.error('QR Code generation failed:', err);
    errorMessage.value = 'Der QR-Code konnte nicht erstellt werden. Prüfen Sie die URL oder versuchen Sie es mit einer kürzeren URL.';
  }
};
</script>

<style>
body {
  font-family: 'Inter', sans-serif;
}
</style>
