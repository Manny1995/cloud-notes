//
//  NoteService.m
//  cloud-notes-ios
//
//  Created by Immanuel Amirtharaj on 7/2/18.
//  Copyright © 2018 Immanuel Amirtharaj. All rights reserved.
//

#import "NoteService.h"

NSString *baseURL = @"http://notes.lilwizeguy.me";

@implementation NoteService

+(void)getNotesForCategory:(NSString *)categoryId completion:(void (^)(NSMutableArray *))completionBlock {
    
    NSString *urlString = [NSString stringWithFormat:@"%@/api/notes?category=%@", baseURL, categoryId];
    NSURL *url = [NSURL URLWithString:urlString];
    NSURLSession *session = [NSURLSession sharedSession];
    NSURLSessionDataTask *task = [session dataTaskWithURL:url completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
    
        NSMutableArray <NoteModel *> *res = [[NSMutableArray alloc] init];
        
        NSError *err;
        NSDictionary *jsonData = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableContainers error:&err];
        NSMutableArray *noteData = [jsonData objectForKey:@"data"];
        
        for (NSDictionary * note in noteData) {
            [res addObject:[[NoteModel alloc] initWithDictionary:note]];
        }
        
        dispatch_async(dispatch_get_main_queue(), ^{
            completionBlock(res);
        });
    }];
    
    [task resume];
}

+(void)getCategories:(void (^)(NSMutableArray *))completion {
    
    NSString *urlString = [NSString stringWithFormat:@"%@/api/classes", baseURL];
    NSURL *url = [NSURL URLWithString:urlString];
    NSURLSession *session = [NSURLSession sharedSession];
    NSURLSessionDataTask *task = [session dataTaskWithURL:url completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
        NSMutableArray<CategoryModel *> *res = [[NSMutableArray alloc] init];
        
        NSError *err;
        NSDictionary *jsonData = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableContainers error:&err];
        
        NSMutableArray *categoryData = [jsonData objectForKey:@"data"];
        
        for (NSDictionary * cat in categoryData) {
            [res addObject:[[CategoryModel alloc] initWithDictionary:cat]];
        }
        
        dispatch_async(dispatch_get_main_queue(), ^{
            completion(res);
        });
    }];
    
    [task resume];
    
}

@end
