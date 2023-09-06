import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useForm, SubmitHandler } from "react-hook-form";
import { router } from "@inertiajs/react";
import { CategoryValidation, CategoryValidationSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@/types";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { HexColorPicker } from "react-colorful";

export function CategoryForm({ category }: { category?: Category }) {
  const form = useForm<CategoryValidationSchema>({
    resolver: zodResolver(CategoryValidation),
    defaultValues: category || { name: '', color: '' }
  });

  const { toast } = useToast();

  const onSubmit: SubmitHandler<CategoryValidationSchema> = (data) => {
    if (category) {
      router.put(route('categories.update', { category: category.id }), { ...category, ...data }, {
        onError(serverErrors) {
          if (serverErrors.name) form.setError('name', { message: serverErrors.name });
          if (serverErrors.color) form.setError('color', { message: serverErrors.color });
        },
        onSuccess() {
          toast({ description: `La catégorie #${category.id} à bien été modifié` });
        }
      });
    } else {
      router.post(route('categories.store'), data, {
        onError(serverErrors) {
          if (serverErrors.name) form.setError('name', { message: serverErrors.name });
          if (serverErrors.color) form.setError('color', { message: serverErrors.color });
        },
        onSuccess() {
          toast({ description: 'La catégorie à bien été créée' });
        }
      });
    }
  };

  return (
    <Form {...form}>
      <form method="post" onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardContent className="pt-6">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(form.formState.errors.name && 'font-bold')}>Nom</FormLabel>
                      <FormControl>
                        <Input placeholder="LOISIR" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className={cn(form.formState.errors.color && 'font-bold')}>Couleur</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              style={{ backgroundColor: field.value }}
                              variant="outline"
                              type="button"
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent align="start" className="w-auto">
                            <HexColorPicker color={field.value} onChange={field.onChange} />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="outline">{category ? 'Modifier' : 'Ajouter'}</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
