//
//  CategoryModel.m
//  cloud-notes-ios
//
//  Created by Immanuel Amirtharaj on 7/2/18.
//  Copyright © 2018 Immanuel Amirtharaj. All rights reserved.
//

#import "CategoryModel.h"

@implementation CategoryModel


-(instancetype)initWithDictionary:(NSDictionary *)categoryObject {
    self = [super init];
    

    self.title = categoryObject[@"title"];
    self.numDocuments = categoryObject[@"numDocuments"];
    self.queryTitle = categoryObject[@"queryTitle"];
    self.id = categoryObject[@"_id"];

    return self;
}

@end
