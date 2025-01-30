import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button"; 
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form"; 
import { Input } from "./ui/input"; 
import {useRoutesStore} from "../api/useRoutesStore.js"

const formSchema = z.object({
    startLocation: z.string().min(2, {
        message: "Start location must be at least 2 characters.",
    }),
    endLocation: z.string().min(2, {
        message: "End location must be at least 2 characters.",
    }),
    busRouteName: z.string().min(2, {
        message: "Bus route name must be at least 2 characters.",
    }),
    busCapacity: z.number().min(1, {
        message: "Bus capacity must be at least 1.",
    }),
});

function AddRoute() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            startLocation: "",
            endLocation: "",
            busRouteName: "",
            busCapacity: 0,
        },
    });

    const {createRoute} = useRoutesStore()

    function onSubmit(values) {
        createRoute({
            startLocation: values.startLocation,
            endLocation: values.endLocation,
            busCapacity: values.busCapacity,
            name: values.busRouteName,
        })
    }

    return (
        <div className="flex flex-col items-center justify-center h-[100vh] bg-gray-50">
            <h1 className="text-3xl font-bold mb-4">Add a new route</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-1/2 max-w-[30rem] p-4 border shadow-xl bg-white border-gray-300 rounded-lg">
                    <FormField
                        control={form.control}
                        name="startLocation"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Start Location</FormLabel>
                                <FormControl>
                                    <Input placeholder="Example: Saket" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="endLocation"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>End Location</FormLabel>
                                <FormControl>
                                    <Input placeholder="Example: Connaught Place" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="busRouteName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bus Route Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Example: Route 101" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="busCapacity"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bus Capacity</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Example: 50"
                                        {...field}
                                        onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full">Submit</Button>
                </form>
            </Form>
        </div>
    );
}

export default AddRoute;