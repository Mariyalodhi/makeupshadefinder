import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Palette } from 'lucide-react';

const manualInputSchema = z.object({
  undertone: z.enum(['warm', 'cool', 'neutral', 'olive']),
  depth: z.enum(['very-light', 'light', 'light-medium', 'medium', 'medium-deep', 'deep', 'very-deep']),
});

type ManualInputForm = z.infer<typeof manualInputSchema>;

interface ManualInputFormProps {
  onSubmit: (data: { undertone: string; depth: string }) => void;
  isLoading?: boolean;
}

export function ManualInputForm({ onSubmit, isLoading }: ManualInputFormProps) {
  const form = useForm<ManualInputForm>({
    resolver: zodResolver(manualInputSchema),
    defaultValues: {
      undertone: undefined,
      depth: undefined,
    },
  });

  const handleSubmit = (data: ManualInputForm) => {
    onSubmit(data);
  };

  return (
    <Card className="bg-gray-50 border-none shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center text-lg font-semibold text-gray-800">
          <User className="w-5 h-5 mr-2" />
          Manual Skin Tone Input
        </CardTitle>
        <p className="text-gray-600 text-sm">
          Can't upload a photo? Describe your skin tone manually to get personalized recommendations.
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="undertone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skin Undertone</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select your undertone" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="warm">Warm (Yellow/Golden)</SelectItem>
                      <SelectItem value="cool">Cool (Pink/Red)</SelectItem>
                      <SelectItem value="neutral">Neutral (Balanced)</SelectItem>
                      <SelectItem value="olive">Olive (Green/Yellow)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="depth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skin Depth</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select your depth" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="very-light">Very Light</SelectItem>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="light-medium">Light-Medium</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="medium-deep">Medium-Deep</SelectItem>
                      <SelectItem value="deep">Deep</SelectItem>
                      <SelectItem value="very-deep">Very Deep</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Finding Your Shades...
                </>
              ) : (
                <>
                  <Palette className="w-4 h-4 mr-2" />
                  Find My Shades
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
