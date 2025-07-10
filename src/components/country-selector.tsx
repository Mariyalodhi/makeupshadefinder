import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe } from 'lucide-react';
import { COUNTRY_SETTINGS } from '@/lib/product-database';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin } from 'lucide-react';

interface CountrySelectorProps {
  selectedCountry: string;
  onCountryChange: (country: string) => void;
}

export function CountrySelector({ selectedCountry, onCountryChange }: CountrySelectorProps) {
  return (
    <div className="flex items-center space-x-3">
      <Globe className="w-5 h-5 text-gray-600" />
      <Select value={selectedCountry} onValueChange={onCountryChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Select your country" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(COUNTRY_SETTINGS).map(([key, country]) => (
            <SelectItem key={key} value={key}>
              <div className="flex items-center space-x-2">
                <span>{country.name}</span>
                <span className="text-xs text-gray-500">({country.currency})</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}